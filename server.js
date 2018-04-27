const express = require(`express`);
const path = require(`path`);
const bodyParser = require(`body-parser`);
const exphbs = require(`express-handlebars`);
const mongoose = require(`mongoose`);

const port = process.env.PORT || 3000;
const app = express();


app.listen(port,()=>{
  console.log(`Web Server up on port ${port}!`);
})
