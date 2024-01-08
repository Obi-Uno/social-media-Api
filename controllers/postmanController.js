const { MongoClient } = require("mongodb");
const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);
const DB=require('../dbOperations');

module.exports.findOne= (req,res)=>{

    const searchParams = req.body;
    console.log(searchParams);
     ( DB.search(searchParams)).then((x)=>{
          if(x.length)
         res.send(x);
     else 
         res.send(`couldn't find your query in the database`);
     });

};

module.exports.findAll= (req,res)=>{
    
    DB.getAll()
    .then((x)=>{
         if(x.length)
         res.send(x);
        else
        res.send("Database is empty");
    })

};

module.exports.postOne=(req,res)=>{
    const reqBody= req.body;
    
    DB.add(reqBody).then((x)=>{
        
       if(x.acknowledged)
        res.send("database has been updated");
       else
       res.send("An error occured, please try again"); 

    });
};

module.exports.postMany=(req,res)=>{
    
    const reqBody=req.body;
    DB.addMany(reqBody).then(x=>{
        if(x.acknowledged)
        res.send("dataBase has been updated");
        else
        res.send("task unsuccessfull , please try again");
    })
};


// delete will delete an entire document , so we need to use a unique identifier , in our case , email id is sufficient 
// body wil contain an object that will conatin a single key value pair { email : "xyz@fgh.com"} 
module.exports.deleteOne=(req,res)=>{
    const param= req.body;
     DB.del(param).then(x=>{
        if(x.acknowledged)
        res.send(`Document with ${param.email} has been deleted`);
    else
        res.send(`either an eror has occured , please try again in a while`);
     })
};


// patch updates the document  , post creates , put replaces a document with another one

// patch 

// for patch we will need array of 2 objects 
// arr[0]-> will represent the identification of the document to be changed 
// arr[1]-> will be changes and new insertions
module.exports.patch=(req,res)=>{

    const param= req.body;

    DB.patching(param).then(x=>{
        // console.log(x.acknowledged);
        if(x.acknowledged)
        res.send("document has been updated !");
         else 
         res.send("document could not be updated due to an error , please try again");
    })

};

module.exports.replace =(req,res)=>{
    const param =req.body;

    DB.replacing(param).then(x=>{
        if(x.acknowledged==true)
        res.send("document has been replaced!");
    else
       res.send("an error has occured");
    })
};