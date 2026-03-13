const errorHandler = (err, req, res, next) => {
  console.error("❌ Unhandled error:", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Something went wrong!",
  });
};

module.exports = errorHandler;