/**
 * Api Error Class
 */
export default class ApiError extends Error {
  name = "ApiError";

  constructor(public status: number, message: string, public field?: string) {
    super(message);
  }

  /**
   * Validation Error with Bad Request Status
   */
  static validation(message: string, field?: string) {
    return new ApiError(400, message, field);
  }

  /**
   * Convert ApiError to response object
   */
  static toResponse(error: ApiError) {
    return { error: error.message, field: error.field };
  }
}
