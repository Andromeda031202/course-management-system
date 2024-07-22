const { User } = require('./models/user');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
const passport = require('passport');

passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
        const user = await User.findOne({ _id: jwt_payload.id, email: jwt_payload.email })
        if (!user)
            return done(null, false)
        else
            return done(null, user)
    }
    catch (err) {
        return done(err, false)
    }
}))
