module.exports = aysncErrorHandler => (req, res, next) => {
    Promise.resolve(aysncErrorHandler(req, res, next)).catch(next)
} 