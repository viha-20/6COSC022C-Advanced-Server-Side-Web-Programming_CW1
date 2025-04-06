const { errorResponse } = require('../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  errorResponse(res, 'Something went wrong', 500);
};

const notFound = (req, res, next) => {
  errorResponse(res, 'Route not found', 404);
};

module.exports = {
  errorHandler,
  notFound
};