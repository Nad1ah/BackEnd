const { MongoClient } = require("mongodb")  

let db;
 async function getDb (){

    const client = new MongoClient(process.env.DB_URL);
    const connection = await client.connect(); 
     db = connection.db(process.env.DB_NAME);
   
}

module.exports = {
    getDb,
}