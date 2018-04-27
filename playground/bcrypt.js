const bcrypt = require(`bcryptjs`);
const password = "abc";
console.log(`Password:`,password);
// this one is not very clean
// bcrypt.genSalt(10,(err,salt)=>{
//   bcrypt.hash(password,salt,(erro,hash)=>{
//     console.log(`Hashed Password:`,hash);
//   })
// })

//10 is the number of times it will generate
//this one is more cleaner
bcrypt.hash(password,10).then((hash)=>{
  console.log(`Hashed Password:`,hash);
}).catch(err=>{
  console.log(err);
})
// const hashedPassword = `$2a$10$C1aKAn9glG9b1RCe5OiM3OyQSjagDEI7B4FedamtaWTwj8IruduBe`;
//
// bcrypt.compare(password,hashedPassword,(erro,result)=>{
//   console.log(`Password is valid:`,result);
// })
