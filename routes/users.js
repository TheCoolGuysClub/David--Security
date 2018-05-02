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

users.post(`/register`,[
  //here we go again this is the first function
  body(`email`)
    //this checks if the email is a vaild email
    .isEmail()
    //this prints the error message if the isEmail() returns false
    .withMessage(`Invalid Email Address`),
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
      return console.log(`errors`,errors.array());
    }
    const user = matchedData(req);
    console.log(`valid user:`,user);

})


users.get(`/login`,(req,res)=>{
  res.render(`login`);
})

module.exports = users;
