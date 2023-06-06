import type {Context, Next} from "oak";
import {IS_DEV} from "../env.ts";
import ApiError from "../controllers/error.ts";

/**
 * Error Handler Middleware
 */
export async function errorHandler(ctx: Context, next: Next) {
    try {
        await next();
    } catch (err) {
        let status = 500;
        let body: Record<string, unknown> = {error: err.message};
        const isApiError = err instanceof ApiError;

        // check if error is an instance of ApiError
        if (isApiError) {
            status = err.status;
            body = ApiError.toResponse(err);
        }

        // set response status
        ctx.response.status = status;
        ctx.response.body = body;

        // log error if development and not an instance of ApiError
        if (IS_DEV && !isApiError) console.error(err);
    }
}

/**
 * Enable CORS Middleware
 */
export async function enableCors(ctx: Context, next: Next) {
    const origin = ctx.request.headers.get("origin") || "";

    ctx.response.headers.set("Access-Control-Allow-Origin", origin);
    ctx.response.headers.set("Access-Control-Allow-Credentials", "true");
    ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    ctx.response.headers.set(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (ctx.request.method === "OPTIONS") {
        ctx.response.status = 200;
        return;
    }

    await next();
}
