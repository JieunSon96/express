const JWT = require ('jsonwebtoken');
const User = require ('../models/user');
const { JWT_SECRET } =require('../config/secretKeys');

signToken = user=>{
    return JWT.sign({
        iss:'SarahWareHouse',
        sub: user.id,
        iat: Date.now(),
        exp: Math.floor (Date.now () / 1000) + ((60 * 60)*24)  //current time+ 1 day ahead
    }, JWT_SECRET);
}

module.exports={
    signUp: async(req,res,next)=>{
        
        const { email, password, name } =req.value.body;

        //check if there is a user or not
        const foundUser=await User.findOne({ "local.email":email });
        if(foundUser){
            return res.status(403).json({error:'Email is already in user'});
        }

        //create a new user
        const newUser=new User({
            method:'local',
            local:{
                email:email,
                password:password,
                name:name
            }
            });
        await newUser.save();

        //Generate the token
        const token = signToken(newUser);
       
        //respond with token
        res.status(200).json({ token });
    },

    signIn: async(req,res,next)=>{
        console.log('req.user',req.user);

        //Generate Token
        const token = signToken(req.user);
        res.status(200).json({ token });
    },

    googleOAuth:async (req,res,next)=>{
        console.log('req.user',req.user);

        //Generate Token
        const token=signToken(req.user);
        res.status(200).json({ token });
    },

    facebookOAuth:async (req,res,next)=>{
      console.log('req.user',req.user);

      //Generate Token
      const token=signToken(req.user);
      res.status(200).json({ token });
    },

    secret: async(req,res,next)=>{
        console.log('I managed to get here!');
        res.json({secret:"resource"});
    }
}