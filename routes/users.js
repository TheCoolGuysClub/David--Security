const express = require(`express`);
const users = express.Router();
const {body, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');
//local
const User = require(`../models/user.js`);

const logger = (req,res,next)=>{
  console.log("This is our custom middleware");
  console.log(`email before change:`, req.body.email);
  req.body.school=`Paly`;
  console.log("body:",req.body);
  next();
}

users.get(`/register`,(req,res)=>{
  res.render(`register`);
})
users.get('/home',(req,res)=>{
  res.render('home');
})
users.post(`/register`,[
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
        res.redirect(`/home`);
      })
      .catch(e=>{
        res.redirect(`/register`);
      })

})


users.get(`/login`,(req,res)=>{
  res.render(`login`);
})

module.exports = users;
