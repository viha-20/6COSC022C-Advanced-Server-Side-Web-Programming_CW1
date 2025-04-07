const apiResponse = (res, status, success, message, data = null, errors = null) => {
  const response = { success, message };
  if (data) response.data = data;
  if (errors) response.errors = errors;
  return res.status(status).json(response);
};

const successResponse = (res, data = null, message = 'Success', status = 200) => {
  return apiResponse(res, status, true, message, data);
};

const errorResponse = (res, message = 'Error', status = 400, errors = null) => {
  // If it's a server error (500), log it
  if (status >= 500) {
    console.error(`Server Error: ${message}`);
    if (errors) console.error('Error details:', errors);
  }
  return apiResponse(res, status, false, message, null, errors);
};

module.exports = {
  apiResponse,
  successResponse,
  errorResponse
};