const expressJwt = require("express-jwt");

//protecting the route
exports.requireSignin = expressJwt({
    secret: process.env.JWT_TOKEN,
    algorithms: ["HS256"], // added later
   
  });