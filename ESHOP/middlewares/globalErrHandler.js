const globalErrHandler = (err, req, res, next) => {

    const stack = err.stack;
    const message = err.message;
    const status = err.status ? err.status : "failed";

    // send response
    res.status(statusCode).json({
        stack,
        status,
        message,

    });

};

module.exports = globalErrHandler;