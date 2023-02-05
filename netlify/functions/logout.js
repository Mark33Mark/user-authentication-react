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

import { clearCookie } from "./helpers/jwt-helper";

exports.handler = async () => {

  return {
    statusCode: 200,
    headers: {
      "Set-Cookie": clearCookie(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: "Logged out successfully" })
  };

}