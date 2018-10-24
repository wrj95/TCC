var jwt = require("jsonwebtoken");

module.exports = function (application) {
// Adding Middleware wich will request the token on following function
application.use(function (req, res, next) {
    let path = req.path
    let userData = {}
        userData["token"] = req.body.token || req.headers["token"] || req.query.token;
        userData["id"] = path.split('/')[4] ;
    
    let appData = {};
    
    if (userData.token) {
        jwt.verify(userData.token, process.env.SECRET_KEY, function (err,payload) {
            if (err) {
                appData["error"] = 1;
                appData["data"] = "Token is invalid !";
                res.status(500).json(appData);
            } else if (payload.id != userData.id){
                appData["error"] = 1;
                appData["data"] = "Invalid User! Please sign in";
                res.status(403).json(appData);
            } else {
                next();
            }
        });
    } else {
        appData["error"] = 1;
        appData["data"] = "Please send a token or login";
        res.redirect(301, "http://10.1.0.101:80/")
        // res.status(403).json(appData);
    }
});
}