module.exports = function (application) {
    application.use(function (req, res, next) {
        res.status(404).render("general/notfoundpage")
    })
}