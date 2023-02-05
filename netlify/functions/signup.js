/*
-----------------------------------------------------------

TEMPLATE

exports.handler = async (event, context) => {
  const errorStatusCode = 500

  try {

  } catch (err) {
    return {
      statusCode: errorStatusCode,
      body: JSON.stringify({ msg: err.message }),
    }
  } finally {
  }
};

-----------------------------------------------------------
*/

import bcrypt from "bcryptjs";
import { createClient } from "./helpers/db-helper";
import { createJwtCookie } from "./helpers/jwt-helper";


exports.handler = async (event, context) => {

  const dbClient = createClient();
  let errorStatusCode = 500;

  try {

    // Connect to the database and get a reference 
    // to the `users` collection
    await dbClient.connect();
    const users = dbClient.usersCollection();

    // Get the email and password from the request body
    const { email, password } = JSON.parse(event.body);

    // console.log('event = ', event);

    // Check to see if the user already exists, if 
    // so return error (409 Conflict)
    const existingUser = await users.findOne({ email });
    
    if (existingUser !== null) {
      errorStatusCode = 409;
      throw new Error(`A user already exists with the email: ${email}`);
    }

    // Get a salted hash of the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert the email and the hashed password in the `users` collection
    const { insertedId } = await users.insertOne({
          email,
          password: passwordHash,
    });

    const session_cookie = createJwtCookie(insertedId, email);

    // Return the user id and a Set-Cookie header with the JWT cookie
    return {
      statusCode: 200,
      headers: {
        "Set-Cookie": session_cookie,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: insertedId, email })
    };

  } catch (err) {
    
    return {
      statusCode: errorStatusCode,
      body: JSON.stringify({ msg: err.message })
    };
    
  } finally {

    // Close connection to the database
    dbClient.close();

  }
}