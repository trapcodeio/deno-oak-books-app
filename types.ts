import type { RouterContext } from "oak";
import { ApiBook } from "./database/repositories/books.repo.ts";

/**
 * Expected Params
 */
type Params = {
    id?: string;
};

/**
 * Context State
 */
type State = { book?: ApiBook };

// Default Context
export type Context = RouterContext<string, Params, State>;
