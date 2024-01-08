
const express = require('express');

const { MongoClient } = require("mongodb");

const app= express();
const bodyParser=require('body-parser');
app.use(bodyParser.json());

// console.log("hey delilah");

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);
const DB=require('./dbOperations');
const postmanRouter= require('./routes/postmanRoute');




// default page

app.get('/',(req,res)=>{
    res.send("hello there ,feel free to roam around , but you know at the end ,please use postman ,for now ,atleast");
})

app.use(postmanRouter);


app.listen(3000 ,()=>{
    console.log(`app is up and running at http://localhost:3000`);
});


