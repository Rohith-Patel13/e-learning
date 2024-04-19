const jwt = require("jsonwebtoken")
require("dotenv").config();


//middleware to authenticate the JWT token:
exports.authenticateJwtToken = (requestObject, responseObject, next) => {
    console.log(requestObject,"requestObject")
    /*
      example:
      let options = {
          method: requestMethodEl.value,
          headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer 956024779072d5b1668e3e20dce2bbd34377cccc9db7ff52e0b4a8a479c5cc7b"
          },
          body: requestBodyValue
      };
    */
  
    /*  
    console.log(requestObject.headers);
    {
    'user-agent': 'vscode-restclient',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvZUJpZGVuIiwiaWF0IjoxNjkxNzMzNTkxfQ.pr-0VY1GVd5EpndR7ua3Ta1H7nrDOzZi-Ok1OqFmCU4',
    'accept-encoding': 'gzip, deflate',
    host: 'localhost:3001',
    connection: 'close'
    }
    */
    const authorizationValue = requestObject.headers.authorization;
    let tokenValue;
    if (authorizationValue !== undefined) {
      const authorizationArray = authorizationValue.split(" ");
      /*
      console.log(authorizationArray);
      [
    'Bearer',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvZUJpZGVuIiwiaWF0IjoxNjkxNzMzNTkxfQ.pr-0VY1GVd5EpndR7ua3Ta1H7nrDOzZi-Ok1OqFmCU4']
      */
      tokenValue = authorizationArray[1];
    }
  
    if (tokenValue === undefined) {
      responseObject.status(401);
      responseObject.send("Invalid JWT Token");
    } else {
      jwt.verify(tokenValue, process.env.SECRET_STRING, async (error, payload) => {
        if (error) {
          console.log(error.message)  
          responseObject.status(401);
          responseObject.send("Verification of JWT Token failed");
        } else {
          console.log(payload);
  
          requestObject.name = payload.name;
          requestObject.user_id = payload._id;
          next();
        }
      });
    }
};
