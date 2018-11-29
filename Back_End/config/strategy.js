const passport = require("passport")
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function (application) {

    const params = {
        secretOrKey: process.env.SECRET_KEY,
        jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromHeader("token"), ExtractJwt.fromUrlQueryParameter("token")])
    };
    const strategy = new JwtStrategy(params, function (payload, done) {
        var database = application.config.database()
        database.getConnection(function (err, connection) {
            if (err) {
                return done("Service is unavaiable, please try again later", null)
            } else {
                if (payload.profileType == 'user') {
                    let userDAO = new application.api.models.userDAO(connection)
                    userDAO.login(payload.email, function (err, rows) {
                        if (err) {
                            console.log(err)
                            return done("An Error ocurred, please check the console log", null)
                        } else {
                            if (rows.length > 0) {
                                return done(null, {
                                    id: rows[0].id,
                                    email: rows[0].email
                                })
                            } else {
                                return done("User Not Found", false);
                            }
                        }
                    });
                }

                if (payload.profileType == 'company') {
                    let companyDAO = new application.api.models.companyDAO(connection)
                    companyDAO.login(payload.email, function (err, rows) {
                        if (err) {
                            console.log(err)
                            return done("An Error ocurred, please check the console log", null)
                        } else {
                            if (rows.length > 0) {
                                return done(null, {
                                    id: rows[0].id,
                                    email: rows[0].email
                                })
                            } else {
                                return done("User Not Found", false);
                            }
                        }
                    }); 
                }

                connection.release();
            }
        });
    });

    passport.use(strategy);
    
    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate("jwt",{session:false,
            failureRedirect: 'http://buscafrete.net:80/'
            });
        },
    };

}
