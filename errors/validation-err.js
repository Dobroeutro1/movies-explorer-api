class ValidationError extends Error {
  constructor(message, next) {
    super(message);
    this.statusCode = 401;
    next();
  }
}

module.exports = ValidationError;
