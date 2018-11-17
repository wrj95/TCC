
module.exports = function (application) {
    
    application.use(application.config.strategy.initialize());

}