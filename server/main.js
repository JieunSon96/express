const express = require('express')
const cors=require('cors');
const app = express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const config=require('./config/key');
const {User} =require('./models/user');
const {auth} =require('./middleware/auth');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const authRoutes=require('./routes/authUser');
const profileRoutes=require('./routes/profile');
const passportSetup=require('./config/passport');

//connect to MongoDB
mongoose.connect(config.mongoURI 
,{useNewUrlParser:true}).then(()=>console.log('DB Connected'))
                              .catch(err=>console.log(err));

                              
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());

app.use('/api/auth',authRoutes);
app.use('/profile',profileRoutes);


app.get("/",(req,res)=>{
  res.json({
    "Hello":"SarahWareHouse API"
  })
})


app.get("/api/users/logout",auth,(req,res)=>{
   User.findOneAndUpdate({_id:req.user._id},{token:""},(err,doc)=>{
     if(err) return res.json({success:false,err})
     return res.status(200).send({
       success:true
     })
   })
});

const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(301).redirect('/login');
  }
};


app.get("/api/users/auth",auth,(req,res)=>{
  res.status(200).json({
    _id:req.user._id,
    isAuth:true,
    email:req.user.email,
    name:req.user.name,
    lastname:req.user.lastname,
    role:req.user.role
  });

});

app.post('/api/users/register',(req,res)=>{
  const user=new User(req.body)
  user.save((err,doc)=>{
    if(err) return res.json({success:false,err})
    return res.status(200).json({
      success:true,
      userData:doc
    })
  })

});

app.post('/api/users/login',(req,res)=>{
  //find the email
   User.findOne({email:req.body.email},(err,user)=>{
     if(!user){
       return res.json({
         loginSuccess:false,
         message:"Auth Failed, email Not Found"
       });
     }

  //compare password
  user.comparePassword(req.body.password,(err,isMatch) => {
    if(!isMatch){
      return res.json({loginSuccess:false,message:"wrong password!"})
    }


  //generateJWTToken
  user.generateJWTToken((err,user)=>{
    if(err) return res.status(400).send(err);
    res.cookie("x_auth",user.token).status(200).json({
      loginSuccess:true,
      userId:user._id,
        })
    })
  })

  });
});

// const port=process.env.PORT || 3005;

// app.listen(port, () => {console.log(`Server Running on at ${port}`)
// });
