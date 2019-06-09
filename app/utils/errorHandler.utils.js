const errorHandlerUtils = (err, message) => ({
  success: false,
  message: message || 'An unexpected error occurred!',
  error: err.errors ? err.errors[0].message : 'Unknown',
  fields: err.fields || ''
});

export default errorHandlerUtils;
