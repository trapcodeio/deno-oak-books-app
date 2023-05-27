import { RouterContext } from "oak";
import {
  BookForm,
  BooksRepository,
} from "../database/repositories/books.repo.ts";

/**
 * Index - GET /
 */
export function index(ctx: RouterContext<string>) {
  ctx.response.body = {
    message: "Books App API by Deno Oak",
  };
}

/**
 * Books - GET /books
 */
export async function books(ctx: RouterContext<string>) {
  ctx.response.body = await BooksRepository.all();
}

/**
 * Create Book - POST /books
 */
export async function create(ctx: RouterContext<string>) {
  // get book form data from request body
  const body: BookForm = await ctx.request.body().value;

  // validate book form data
  await BooksRepository.validate(body);

  // create book
  const book = await BooksRepository.create(body);

  // send response
  ctx.response.body = book;
}

/**
 * View Book - GET /books/:id
 */
export function view(ctx: RouterContext<string>) {
  // state is added by the `loadBookId` middleware
  ctx.response.body = ctx.state.book!;
}

/**
 * Update Book - PUT /books/:id
 */
export async function update(ctx: RouterContext<string>) {
  // state is added by the `loadBookId` middleware
  const book = ctx.state.book!;

  // get book form data from request body
  const body: BookForm = await ctx.request.body().value;

  // validate book form data
  await BooksRepository.validate(body);

  // update book
  const updatedBook = await BooksRepository.update(book.id, body);

  // send response
  ctx.response.body = updatedBook;
}

/**
 * Delete Book - DELETE /books/:id
 * Note: `$delete` is used instead of `delete` because `delete` is a reserved word in JavaScript
 */
export async function $delete(ctx: RouterContext<string>) {
  // state is added by the `loadBookId` middleware
  const book = ctx.state.book!;

  // delete book
  await BooksRepository.delete(book.id);

  // send response
  ctx.response.body = { message: "Book deleted successfully" };
}

/**
 * Delete All Books - DELETE /books
 */
export async function deleteAll(ctx: RouterContext<string>) {
  // delete all books
  const res = await BooksRepository.deleteAll();

  // send response
  ctx.response.body = { message: `${res.rowCount} books deleted successfully` };
}
