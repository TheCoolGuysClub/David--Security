const express = require(`express`);
const users = express.Router();
const User = require(`../models/user.js`);

users.get(`/register`,(req,res)=>{
  res.render(`register`);
})

users.post(`/register`,(req,res)=>{
  console.log(req.body);
})

users.get(`/login`,(req,res)=>{
  res.render(`login`);
})

module.exports = users;
