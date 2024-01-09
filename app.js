const express = require('express');
const mongoose = require('mongoose');
const authRoutes= require('./routes/authRoutes');
const cookieparser = require('cookie-parser');
const { checkUser,requireAuth } =require('./middleware/authMiddleware');
const bodyParser=require('body-parser');
const postmanRouter= require('./routes/postmanRoute');







const app = express();
app.use(bodyParser.json());

// middleware
app.use(express.static('public'));
app.use(express.json());
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://0.0.0.0:27017/Node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) =>{ 
   console.log("db connected");
    app.listen(3000);
    
  })
  .catch((err) => console.log(err));

// routes
app.use(cookieparser());

app.get('*',checkUser);
app.use(postmanRouter);
app.use(authRoutes);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));


// cookies

// app.get('/set-cookies',(req,res)=>{
//   // res.setHeader('Set-Cookie','newUser=true');
// res.cookie('newUser',false);
// res.cookie('isEmployee',true,{maxAge:1000*60*60*24});
//   res.send('you got cookies!');
// });

// app.get('/read-cookies',(req,res)=>{
// const abc=req.cookies;
// console.log(abc);
// res.json(abc);

// });
