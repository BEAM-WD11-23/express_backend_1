var { MongoClient } = require("mongodb");

const client = new MongoClient('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.10')

async function main(){
    try {
        const database = client.db('test')
        const usersCollection = database.collection('users')

        await usersCollection.insertOne({name:'Anna Sarah Jackson', age: 22})

        const allUsers = await usersCollection
        .find({name: /sarah/i})
        .project({_id:0, name:1})
        .toArray()
        
        console.log(allUsers)
    }
    catch(e){
        console.log(e)
    }
}

main()