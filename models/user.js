const mongoose = require(`mongoose`);
const bcrypt = require(`bcryptjs`);
const validator = require(`validator`)

const userSchema = mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique:true,
    //if we want more than one validator, we have to right more validate
    validate:{
      //validator.isEmail is a method inside validator that checks
      //if the String is in email format
      validator:validator.isEmail,
      //message is the message that would appeared if the validator failed
      //to validate
      message:`{VALUE} is not an email`
    }
  },
  password:{
    type:String,
    require:true,
    minLength:6
  }

});
//function can binds the word `this` to the current method caller
//like this.something
//arrow function does not bind `this`
userSchema.pre(`save`,function() {
  const user = this;
})
//creates a User that is userSchema
const User = mongoose.model(`User`,userSchema);
//Exports User
module.exports=User;
