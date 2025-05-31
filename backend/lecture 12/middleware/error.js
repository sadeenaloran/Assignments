// handler the error.
export const errorHandler = (err, req, res, next) => {
  //error that passed in next.
  const statusCode = err.statusCode || 500; //500-> internal server error.

  const message =
    process.env.NODE_ENV === "production" ? "Internal Error" : err.message;

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export const notfound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};
