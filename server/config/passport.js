const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('./secretKeys');
// const GoogleStrategy = require('passport-google-oauth20');
// const GooglePlusTokenStrategy = require('passport-google-plus-token');
const GooglePlusTokenStrategy = require('passport-token-google').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const keys = require('./secretKeys');
const User = require('../models/user');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })

});


//JWT Strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        //find the user specified in token
        const user = await User.findById(payload.sub);

        //if user doesnt'exists, handle it
        if (!user) {
            return done(null, false);
        }

        //otherwise, return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

//Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {

    try {
        //Find the user given the email
        const user = await User.findOne({ "local.email":email });
        //if not, handle it
        if (!user) {
            return done(null, false);
        }


        //Check if the password is correct
        const isMatch = await user.isValidPassword(password);
        //if not, handle it

        if (!isMatch) {
            return done(null, false);
        }

        //otherwise, return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }





}));

// Google Oauth Stratrgy
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('profile', profile);
        // console.log('accessToken',accessToken);
        // console.log('refreshToken',refreshToken);

        //check whether this current user exists in our db
        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
            console.log('user already exists in our DB');
            return done(null, existingUser);
        }

        console.log('User doesnt exists we will creating a new one');

        //if new account
        const newUser = new User({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value
            }
        });

        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error,false,error.message);
    }


}));

//Facebook Strategy
passport.use('facebookToken',new FacebookTokenStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret
},async (accessToken,refreshToken,profile,done) => {
    try{
        console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    
    const existingUser = await User.findOne({ "facebook.id": profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = new User({
      method: 'facebook',
      facebook: {
        id: profile.id,
        email: profile.emails[0].value
      }
    });

    await newUser.save();
    done(null, newUser);
    }catch(error){
        done(error,false,error.message);
    }
}));
// passport.use('googleToken',
//     new GoogleStrategy({
//         clientID: keys.google.clientID,
//         clientSecret: keys.google.clientSecret,
//         callbackURL: '/api/auth/google/callback'
//     }, async (accessToken, refreshToken, profile, done) => {
//         console.log('accessToken',accessToken);
//         console.log('refreshToken',refreshToken);
//         console.log('profile',profile);
//         console.log('profile>>>>>>>>>' + profile.displayName + '/ email : ' + profile._json.email + ' / name: ' + profile._json.given_name + ' / lastname: ' + profile._json.family_name);
//         //    var user=new User(); 

//         User.findOne({ email: profile._json.email }).then((currentUser) => {
//             if (currentUser) {
//                 console.log('user is', currentUser);
//                 done(null, currentUser);
//             } else {
//                 new User({
//                     name: profile._json.given_name,
//                     lastname: profile._json.family_name,
//                     email: profile._json.email,
//                     googleId: profile._json.id,
//                     image: profile._json.picture,
//                     role: 0
//                 }).save().then((newUser) => {
//                     console.log('new user created : ' + newUser);
//                     done(null, newUser);
//                 });
//             }
//         })


//     })
// )