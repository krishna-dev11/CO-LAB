// utils/errors.js
class BadRequestError extends Error {
  constructor(message, error) {
    super(message);
    this.statusCode = 400;
    console.error(error);
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

export { BadRequestError, NotFoundError };
