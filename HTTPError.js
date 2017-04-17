const { Map } = require('immutable');

const errorMap = Map({
  400: 'Bad Request',
  401: 'Unauthorized',
  404: 'Not Found',
  500: 'Unexpected Error',
});

class HTTPError extends Error {
  constructor(status=500, error={}) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.status = status;
    this.error = errorMap.get(this.status) || 'Uncaught Error';
    this.errorMessage = error;
    this.message = JSON.stringify({
      status: this.status,
      error: this.error,
      errorMessage: this.errorMessage,
    });
  }

  getError() {
    try {
      return JSON.parse(this.message);
    } catch (err) {
      const { status, error, errorMessage } = this;
      return { status, error, errorMessage };
    }
  }
}

module.exports = HTTPError;
