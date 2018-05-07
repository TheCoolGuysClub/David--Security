const express = require(`express`);
const path = require(`path`);
const bodyParser = require(`body-parser`);
const exphbs = require(`express-handlebars`);
const flash = require(`connect-flash`);
const session = require(`express-session`);
//Dotenv is a zero-dependency module that loads environment variables from a
//.env file into process.env. Storing configuration in the
//environment separate from code is based on The Twelve-Factor App
//methodology.
//.config() looks for a file called dotenv, and it stores it
require(`dotenv`).config();
//local requirements
const mongoose = require(`./db/mongoose.js`);
const authRoute = require(`./routes/users.js`);
const morgan = require(`morgan`);


const port = process.env.PORT || 3000;
const app = express();

//view engine setup
app.set(`views`,path.join(__dirname,`views`));
app.engine(`hbs`,exphbs({defaultLayout:`main`,
                         extname:      `.hbs`}))
app.set(`view engine`,`hbs`);
//Middleware
//session make a session cookie for you
app.use(session({
  //this is the string you made up
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized: true,
  cookie:{secure:false}
}));
//flash is a function that make a flash cookie for you
//the set up takes no agruments because it will be define instanly
//it needs session first
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan(`dev`));
app.use((req,res,next)=>{
  //the reason why we use res
  res.locals.successMessage = req.flash(`successMessage`);
  res.locals.errorMessages = req.flash(`errorMessages`);
  next();
})
//mount routes
app.use(`/`,authRoute);

app.get(`/`,(req,res)=>{
  res.render(`index`);
})

// app.get(`/register`,(req,res)=>{
//   res.render(`register`);
// })

app.listen(port,()=>{
  console.log(`Web Server up on port ${port}!`);
})
