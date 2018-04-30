const mongoose = require(`mongoose`);
const bcrypt = require(`bcryptjs`);
const validator = require(`validator`)

const userSchema = mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique:true
  }
  password:{
    type:String,
    require:true,
    minLength:6
  }

});
