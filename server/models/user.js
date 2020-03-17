const mongoose = require('mongoose');
// const bcrypt=require('bcrypt');

const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const userSchema = mongoose.Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    required: true
  },
  local: {
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String
    },
    name:{
      type: String
    },
    image:{
      type: String
    }
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  }
  
  // ,
  // name: {
  //   type: String,
  //   maxlength: 50
  // },
  // email: {
  //   type: String,
  //   trim: true,
  //   unique: 1,
  //   lowercase: true,
  //   required: true
  // },
  // password: {
  //   type: String,
  //   required: true,
  //   minlength: 5
  // },
  // lastname: {
  //   type: String,
  //   maxlength: 50
  // },
  // role: {
  //   type: Number,
  //   default: 0
  // },
  // token: {
  //   type: String
  // },
  // tokenExp: {
  //   type: Number
  // },
  // type: String,
  // image: String
})

// userSchema.pre('save',function(next){ 
//   var user=this;

//   if(user.isModified('password')){


//   bcrypt.genSalt(saltRounds,function(err,salt){
//     if(err) return next(err);

//     bcrypt.hash(user.password,salt,function(err,hash){
//       if(err) return next(err);
//       user.password =hash;
//       next()
//     })
//   });

// }else{
//   next()
// }

// });

userSchema.pre('save', async function (next) {
  try {

    if (this.method !== 'local') {
      next();
    }
    //Generate a password Hash (salt + hash)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.local.password, salt);
    //Re-assign hashed version over original, plain text password
    this.local.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
}

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch)
  })
};

userSchema.methods.generateJWTToken = function (cb) {
  var user = this;
  var token = jwt.sign(
    user._id.toHexString(), 'secret')
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err)
    cb(null, user);
  })
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;
  jwt.verify(token, 'secret', function (err, decode) {
    user.findOne({ "_id": decode, "token": token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    })
  })
}

const User = mongoose.model('User', userSchema);
module.exports = User;
