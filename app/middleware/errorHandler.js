function errorHandler(err, req, res) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    console.error(err.stack);
    res.status(statusCode).json({ message });
}

module.exports = errorHandler;