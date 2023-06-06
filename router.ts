import {Router} from "oak";
import * as BooksController from "./controllers/books.controller.ts";
import {loadBookId} from "./middlewares/params.middleware.ts";

const router = new Router();

router.get("/", BooksController.index);
router.get("/books", BooksController.books);
router.post("/books", BooksController.create);
router.get("/books/:id", loadBookId, BooksController.view);
router.put("/books/:id", loadBookId, BooksController.update);
router.delete("/books/:id", loadBookId, BooksController.$delete);
router.delete("/books", BooksController.deleteAll);

export default router;
