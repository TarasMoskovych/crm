const passportJwt = require('passport-jwt');

const User = require('./../models/User');
const keys = require('./../config/keys');

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, async(payload, done) => {
      try {
        const user = await User.findById(payload.userId).select('email id');

        if (user) {
          return done(null, user);
        }

        done(null, false);
      } catch(e) {
        console.log(e);
      }
    })
  )
};
