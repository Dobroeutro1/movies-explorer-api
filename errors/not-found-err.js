class NotFoundError extends Error {
  constructor(message, next) {
    super(message);
    this.statusCode = 404;
    next();
  }
}

module.exports = NotFoundError;
