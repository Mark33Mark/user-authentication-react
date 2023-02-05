
import publicKey from "./helpers/public-key";

exports.handler = async () => {

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ publicKey: publicKey })
  };
  
}