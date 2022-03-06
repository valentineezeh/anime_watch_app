const handleValidations = (req, res, next) => {
  const error = req.validationErrors();
  const validationErrors = [];
  if (error) {
    error.map((err) => validationErrors.push(err.param));
    const field = validationErrors.join(',');
    const message = validationErrors.length > 1 ? `The fields ${field} are required` : `The field ${field} is required`;
    return res.status(400).json({
      error: {
        message,
        field,
        status: '400'
      }
    });
  }
  next();
};

export default handleValidations;
