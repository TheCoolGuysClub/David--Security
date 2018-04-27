const express = require(`express`);
const path = require(`path`);
const bodyParser = require(`body-parser`);
const exphbs = require(`express-handlebars`);
const mongoose = require(`mongoose`);
const users = require(`./routes/users.js`);

const port = process.env.PORT || 3000;
const app = express();

//view engine setup
app.set(`views`,path.join(__dirname,`views`));
app.engine(`hbs`,exphbs({defaultLayout:`main`,
                         extname:      `.hbs`}))
app.set(`view engine`,`hbs`);

//mount routes
app.use(`/users`,users);



app.get(`/`,(req,res)=>{
  res.render(`index`);
})

// app.get(`/register`,(req,res)=>{
//   res.render(`register`);
// })

app.listen(port,()=>{
  console.log(`Web Server up on port ${port}!`);
})
