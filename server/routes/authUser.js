const router=require('express').Router();
const passport= require('passport');
const cookieSession=require('cookie-session');
const keys=require('../config/secretKeys');

router.use(cookieSession({
     maxAge:24*60*60*1000,
     keys: [keys.session.cookieKey]
}));

//initialize passport
router.use(passport.initialize());
router.use(passport.session());

//auth with google
router.get('/google',passport.authenticate('google',{
     scope:['profile','email']
}));

//callback route for google to redirect to
router.get('/google/callback',passport.authenticate('google'),(req,res)=>{
     res.redirect('/profile');
});

module.exports=router;