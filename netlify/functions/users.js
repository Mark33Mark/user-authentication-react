import cookie from "cookie";
import jwt from "jsonwebtoken";
import publicKey from "./helpers/public-key";


exports.handler = async (event, context) => {

  const cookies = event.headers.cookie && cookie.parse(event.headers.cookie)

  if (!cookies || !cookies.jwt) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        msg: "There is no jwt cookie, your request is unauthorised",
      }),
    }
  }

  try {
    
    /* verify throws an error if it can't verify the jwt.
     * By default it checks the exp claim, which is
     * where our expiry information is.
     * If the token is successfully verified,
     * it returns the payload.
     */
    const payload = jwt.verify(cookies.jwt, publicKey)
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: payload.userId, email: payload.email }),
    }

  } catch (err) {

    return {
      statusCode: 401,
      body: JSON.stringify({ msg: err.message }),
    }

  }
}