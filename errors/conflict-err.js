class ConflictError extends Error {
  constructor(message, next) {
    super(message);
    this.statusCode = 409;
    next();
  }
}

module.exports = ConflictError;
