class CastError extends Error {
  constructor(message, next) {
    super(message);
    this.statusCode = 400;
    next();
  }
}

module.exports = CastError;
