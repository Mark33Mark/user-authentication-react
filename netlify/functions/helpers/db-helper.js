import { MongoClient } from "mongodb"

const dbName = "exploring-authentication"

const createClient = () => {

  const client = new MongoClient(

    `mongodb+srv://admin_exploring_authentication:${process.env.MONGODB_PWD}@cluster0.6m5beez.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }

  )

/* 
 * We add a usersCollection function to the client object,
 * this way neither login or signup need to know the name
 * of the database or the users collection.
 */
  client.usersCollection = function() {

    return this.db(dbName).collection("users");
    
  }

  return client

}

export { createClient }