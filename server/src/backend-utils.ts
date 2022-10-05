const sendErrorResponse = function (req, res, status = 500, message, err) {
    if (req.get('env') === 'production') {
        err = undefined;
    }
    res.status(status).json({
        code: status,
        message,
        error: err
    })
}

export default sendErrorResponse