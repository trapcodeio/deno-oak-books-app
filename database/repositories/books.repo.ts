import ApiError from "../../controllers/error.ts";
import client from "../db.ts";

export interface Book {
  id: number;
  title: string;
  description: string;
  available: boolean;
}

// Db Book
export interface DbBook extends Book {
  created_at: Date;
  updated_at: Date;
}

// Api Book
// This is because our client side expects the createdAt and updatedAt
// not created_at and updated_at
export interface ApiBook extends Book {
  createdAt: Date;
  updatedAt: Date;
}

// Book Form
export type BookForm = Pick<Book, "title" | "description" | "available">;

/**
 * Books Repository
 * This is where we interact with the database
 */
export class BooksRepository {
  /**
   * Convert DbBook to ApiBook
   */
  private static toApiBook(apiBook: DbBook): ApiBook {
    return {
      id: apiBook.id,
      title: apiBook.title,
      description: apiBook.description,
      available: apiBook.available,
      createdAt: apiBook.created_at,
      updatedAt: apiBook.updated_at,
    };
  }

  /**
   * Validate Book Form
   */
  static validate(book: BookForm): never | void {
    if (!book.title) {
      throw ApiError.validation("Book title is required", "title");
    } else if (!book.description) {
      throw ApiError.validation("Book description is required", "description");
    } else if (book.available === undefined) {
      book.available = false;
    }
  }

  /**
   * Get all books
   */
  static async all(search: string | null): Promise<ApiBook[]> {
    let query: [string, string[]] = ["SELECT * FROM books", []];
    if (search) {
      query = ["SELECT * FROM books WHERE title ILIKE $1", [`%${search}%`]];
    }

    const books = await client.queryObject<DbBook>(query[0], query[1]);
    return books.rows.map((book) => this.toApiBook(book));
  }

  /**
   * Get a book by id
   */
  static async findById(id: number): Promise<ApiBook | null> {
    const book = await client.queryObject<DbBook>(
      "SELECT * FROM books WHERE id = $1",
      [id],
    );

    return book.rows.length > 0 ? this.toApiBook(book.rows[0]) : null;
  }

  /**
   * Create a book
   */
  static async create(book: BookForm): Promise<ApiBook> {
    const result = await client.queryObject<DbBook>(
      "INSERT INTO books (title, description, available) VALUES ($1, $2, $3) RETURNING *",
      [book.title, book.description, book.available],
    );

    return this.toApiBook(result.rows[0]);
  }

  /**
   * Update a book
   */
  static async update(id: number, book: BookForm): Promise<ApiBook> {
    const result = await client.queryObject<DbBook>(
      "UPDATE books SET title = $1, description = $2, available = $3, updated_at = $4 WHERE id = $5 RETURNING *",
      [book.title, book.description, book.available, new Date(), id],
    );

    return this.toApiBook(result.rows[0]);
  }

  /**
   * Delete a book
   */
  static delete(id: number) {
    return client.queryObject<DbBook>("DELETE FROM books WHERE id = $1", [id]);
  }

  /**
   * Delete all books
   */
  static deleteAll() {
    return client.queryObject<DbBook>("DELETE FROM books");
  }
}
