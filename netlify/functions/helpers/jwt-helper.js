import jwt from "jsonwebtoken";
import cookie from "cookie";

/*
 * Generate a JWT with the user ID and email as the payload,
 * then serialize to a secure HTTP-only cookie.
 */

const createJwtCookie = ( userId, email ) => {
  
  // Get the secret key, used to sign the JWT, from your environment variable
  const secretKey =
  "-----BEGIN RSA PRIVATE KEY-----\n" +
  process.env.JWT_SECRET_KEY +
  "\n-----END RSA PRIVATE KEY-----";

  // Create a JWT with the registered user and email as the payload
  const token = jwt.sign({ userId, email }, secretKey, {
  
    algorithm: "RS256",
    expiresIn: "100 days"

});

// Serialize the JWT in a secure http-only cookie
const jwtCookie = cookie.serialize("jwt", token, {
  secure: process.env.NETLIFY_DEV !== "true",
  httpOnly: true,
  path: "/"
});

return jwtCookie;

}

// needed for when user logs out
const clearCookie = () => {
  return "jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

export { createJwtCookie, clearCookie }