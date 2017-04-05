const { Map } = require('immutable');

const errorMap = Map({
  400: 'Bad Request',
  401: 'Unauthorized',
  404: 'Not Found',
  500: 'Unexpected Error',
});

class HTTPError extends Error {
  constructor(status, error) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.status = status || 500;
    this.error = errorMap.get(this.status) || 'Uncaught Error';
    this.errorMessage = error || {};
    this.message = JSON.stringify({
      status: this.status,
      error: this.statusText,
      errorMessage: this.errorMessage,
    });
  }

  getError() {
    try {
      return JSON.parse(this.message);
    } catch (err) {
      const { status, statusText, error } = this;
      return { status, statusText, error };
    }
  }
}

module.exports = HTTPError;
