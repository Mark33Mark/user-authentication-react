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
  
  const dbClient = createClient()
  let errorStatusCode = 500

  try {
    // Connect to the database and get a reference to the `users` collection
    await dbClient.connect()
    const users = dbClient.usersCollection()

    // Get the email and password from the request body
    const { email, password } = JSON.parse(event.body)

    // Check to see if the user exists, if not return error (401 Unauthorized)
    const existingUser = await users.findOne({ email })
    if (existingUser == null) {
      errorStatusCode = 401
      throw new Error(`Invalid password or email`)
    }

    // Compare the password, if it doesn't match return error (401 Unauthorized)
    const matches = await bcrypt.compare(password, existingUser.password)
    if (!matches) {
      errorStatusCode = 401
      throw new Error(`Invalid password or email`)
    }

    // Create a JWT and serialize as a secure http-only cookie
    const userId = existingUser._id
    const jwtCookie = createJwtCookie(userId, email)

    // Return the user id and a Set-Cookie header with the JWT cookie
    return {
      statusCode: 200,
      headers: {
        "Set-Cookie": jwtCookie,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId, email }),
    }
  } catch (err) {
    
    return {
      statusCode: errorStatusCode,
      body: JSON.stringify({ msg: err.message }),
    }

  } finally {

    dbClient.close()

  }
}