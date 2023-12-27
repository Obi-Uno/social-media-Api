
const express = require('express');

const { MongoClient } = require("mongodb");
const app= express();
const bodyParser=require('body-parser');
app.use(bodyParser.json());

console.log("hey delilah");

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);


async function connectDb() {
       const Client=await client.connect();
    const database = Client.db('e-comm');
    const prod = database.collection('products');
       console.log('database connected');
    return prod;
  
}

async function search(param){
    const prod = await connectDb();
    // const data= await prod.find({ name :"sarthak"});
    const arr= await prod.find(param).toArray();
    // console.log(arr);
    return arr;
}

async function getAll(){
    const prod = await connectDb();
    // const data= await prod.find({ name :"sarthak"});
    const arr= await prod.find({}).toArray();
    // console.log(arr);
    return arr;
}

async function add( data){
    const prod = await connectDb();
    const reply= await prod.insertOne(data);
    // console.log("database has been updated");
    return reply;
}

async function addMany(data){
    const prod= await connectDb();
    const reply= await prod.insertMany(data);
    return reply;
}

async function del( mail ){
    const prod = await connectDb();
    const Del=await prod.deleteOne({email : `${mail}`});
    // console.log("data has been deleted");
    return Del;
}
// post -> insert 
// put -> replace 
// patch -> update

async function patching(data){

 // data coould be an array containing -> idenification, set, push

 const iden =data[0], sett=data[1];

 const prod = await connectDb();
    const change=await prod.updateOne(
        iden, 
        {
            $set: sett
        }
        
    );

     return change;
    // console.log(` iden -> ${iden}  ,was changed`);
 

}

async function replacing(data){
    const iden =data[0], sett=data[1];

 const prod = await connectDb();
    const change=await prod.replaceOne(
        iden, 
        sett
        
    );

     return change;
}

// search();
// connectDb();
// getAll();
let randomData= {
     "name" : "edger",
     "email" : "coolEdger@123.com"
};

// add(randomData);
// del("coolEdger@123.com");

let param =[
    {
        "name" : "sarthak"
    }
    ,
    {
        "name" :"sarthak rautela"
        ,
        "well" : "dekhte hai"
    }
    ,
    {
      
    }
]

// patching(param);

// yaha se routing shuru 
// baad mae alag alag file mae karenge



// default page

app.get('/',(req,res)=>{
    res.send("hello there ,feel free to roam around , but you know at the end ,please use postman ,for now ,atleast");
})

app.get('/find/',(req,res)=>{

       const searchParams = req.query;
        ( search(searchParams)).then((x)=>{
             if(x.length)
            res.send(x);
        else 
            res.send('sowri darling , sowri darling!!');
        });
   
})


app.get('/find/all',(req,res)=>{
    
    getAll()
    .then((x)=>{
         if(x.length)
         res.send(x);
        else
        res.send("Database is empty");
    })

})

// insert data in the database

app.post('/one',(req,res)=>{
    const reqBody= req.body;
    
    add(reqBody).then((x)=>{
        
       if(x.acknowledged)
        res.send("database has been updated");
       else
       res.send("An error occured, please try again"); 

    });
});

// insert multiple data into this

app.post('/many',(req,res)=>{
    
    const reqBody=req.body;
    addMany(reqBody).then(x=>{
        if(x.acknowledged)
        res.send("dataBase has been updated");
        else
        res.send("task unsuccessfull , please try again");
    })
})

// delete 
// delete will delete an entire document , so we need to use a unique identifier , in our case , email id is sufficient 
// body wil contain an object that will conatin a single key value pair { email : "xyz@fgh.com"} 
app.delete('/delete',(req,res)=>{
    const param= req.body;
     del(param).then(x=>{
        if(x.acknowledged)
        res.send(`Document with ${param.email} has been deleted`);
    else
        res.send(`either an eror has occured , please try again in a while`);
     })
})


// patch updates the document  , post creates , put replaces a document with another one

// patch 

// for patch we will need array of 2 objects 
// arr[0]-> will represent the identification of the document to be changed 
// arr[1]-> will be changes and new insertions

app.patch('/update',(req,res)=>{

    const param= req.body;

    patching(param).then(x=>{
        // console.log(x.acknowledged);
        if(x.acknowledged)
        res.send("document has been updated !");
         else 
         res.send("document could not be updated due to an error , please try again");
    })

})


app.put('/replace',(req,res)=>{
    const param =req.body;

    replacing(param).then(x=>{
        if(x.acknowledged==true)
        res.send("document has been replaced!");
    else
       res.send("an error has occured");
    })
})


console.log("checking....");


app.listen(3000 ,()=>{
    console.log(`app is up and running at http://localhost:3000`);
});


