var jwt = require("jsonwebtoken");

module.exports = function (application) {
    
    application.use(application.config.strategy.initialize());

    // application.use(/\/user|\/company/, function (req, res, next) {
    //     let path = req.path
    //     let id = path.length - 1
    //     let userData = {}
    //     userData["token"] = req.headers["token"] || req.query.token;

    //     let appData = {};

    //     if (userData.token) {
    //         jwt.verify(userData.token, process.env.SECRET_KEY, function (err) {
    //             if (err) {
    //                 appData["error"] = 1;
    //                 appData["data"] = "Token is invalid !";
    //                 res.status(500).json(appData);
    //             } else {
    //                 next();
    //             }
    //         });
    //     } else {
    //         appData["error"] = 1;
    //         appData["data"] = "Please send a token or login";
    //         //res.redirect(301, "http://10.1.0.101:80/")
    //         res.status(403).json(appData);
    //     }
    // });
}