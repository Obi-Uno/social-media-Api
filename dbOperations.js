const { MongoClient } = require("mongodb");

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);


async function connectDb() {
       const Client=await client.connect();
    const database = Client.db('e-comm');
    const prod = database.collection('products');
    //    console.log('database connected');
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

module.exports ={
connectDb,
search,
getAll,
add,
addMany,
del,
patching,
replacing
};