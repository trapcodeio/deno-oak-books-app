import {Next} from "oak";
import {BooksRepository} from "../database/repositories/books.repo.ts";
import {Context} from "../types.ts";
import ApiError from "../controllers/error.ts";

/**
 * Load Book Id Middleware
 */
export async function loadBookId(ctx: Context, next: Next) {
    // log book id
    const id = Number(ctx.params.id);
    const idIsNotANumber = isNaN(id);

    // check if id is number
    if (idIsNotANumber || !id) {
        throw new ApiError(
            400,
            idIsNotANumber ? "Book id must be a number" : "Book id is required"
        );
    }

    // get book from db
    const book = await BooksRepository.findById(id);
    if (!book) {
        throw new ApiError(404, "Book not found");
    }

    // add book to context state
    ctx.state.book = book!;

    await next();
}
