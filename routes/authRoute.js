const express = require(`express`);
const authRoute = express.Router();
const {body, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
const bcrypt = require(`bcryptjs`);

//local
const User = require(`../models/user.js`);
const {validdateUser} = require(`../middleware/middleware.js`)
const logger = (req,res,next)=>{
  console.log("This is our custom middleware");
  console.log(`email before change:`, req.body.email);
  req.body.school=`Paly`;
  console.log("body:",req.body);
  next();
}

authRoute.get(`/register`,(req,res)=>{
  res.render(`register`);
})
authRoute.get('/home',validdateUser,(req,res)=>{
    res.render(`home`);
    console.log(`UserId;`,req.session.userId);
})
authRoute.post(`/register`,[
  //here we go again this is the first function
  body(`email`)
    //this checks if the email is a vaild email
    .isEmail()
    //this prints the error message if the isEmail() returns false
    .withMessage(`Invalid Email Address`)
    // .custom(email=>{
    //   User.findOne({email:email})
    //   .then(user=>{
    //     if(user){
    //       return false;
    //     }else{
    //       return true;
    //     }
    //   }).catch(e=>{
    //     console.log(e);
    //   })
    // })
    // .withMessage(`this email is already in use`)
    ,

  // this is the second function
  body(`password`)
    //min length
    .isLength({min: 6})
    .withMessage(`Password must be at least 6 characters`)
    //we can use regex too!
    .matches(/\d/)
    .withMessage(`Password must contains at least one digits!`)
  ],
  (req,res)=>{
  const errors = validationResult(req);
    if(!errors.isEmpty()){
      const errorMessages = errors.array().map(obj=>{
      return{message:obj.msg};
      })
      console.log(`errors`,errorMessages);
      req.flash(`errorMessages`,errorMessages)
      return res.redirect(`/register`);
    }
    const userData = matchedData(req);
    const user = new User(userData);
    user.save()
      .then(user=>{
        req.flash(`successMessage`,{message:"sign up successful!"})
        res.redirect(`/login`);
      })
      .catch(e=>{

        if(e.code ===11000){
          req.flash(`errorMessages`,{message:"This email has already registereted"});
        }
        // console.log(e.code);
        res.redirect(`/register`);
      })

})


authRoute.get(`/login`,(req,res)=>{
  res.render(`login`);
})
authRoute.post(`/login`,(req,res)=>{
  User.findOne({email:req.body.email})
  .then(user=>{
    if(!user){
      console.log(`email does not exist`);
      req.flash(`errorMessages`,{message:`This email does not exist`});
      res.redirect(`/login`);
    }
    else{
      bcrypt.compare(req.body.password, user.password).then((passwordIsValid) => {
        if(passwordIsValid){
          req.session.userId = user._id;
          req.flash(`successMessage`,{message:`successfully login!`})
          res.redirect(`/home`);
        }else{
          req.flash(`errorMessages`,{message:`Invalid Password`});
          res.redirect(`/login`);
        }
    })
    .catch(e=>
      {console.log(e);
    })
      //
      // console.log(`user:`,user);
      // req.flash(`successMessage`,{message:`successfully login!`})
      // res.redirect(`/home`);
    }
  }).catch(e=>{
    // req.flash(`errorMessages`,{message:`This email does not exist`});
    return res.redirect(`/login`);
  })
})

authRoute.post(`/logout`,(req,res)=>{
  req.session.userId=undefined;
  res.redirect(`/login`);
})


module.exports = authRoute;
