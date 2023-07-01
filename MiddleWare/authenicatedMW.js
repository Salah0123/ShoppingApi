const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let token;
    if (req.get("authorization")){
      try {
        let token = req.get("authorization").split(" ")[1];
        let decodedToken = JWT.verify(token, process.env.secretKey);
        req.decodedObject = decodedToken;
        console.log(decodedToken);
        next();
      } catch (error) {
        next(error);
      }
    }else {
      let error = new Error("You Are Not Authenticated")
      error.status=404
      next(error)
    }
  
};


module.exports.isAdmin = (req, res, next) => {
  console.log(req.decodedObject);
  if (req.decodedObject.role == "admin") {
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};
module.exports.isUser = (req, res, next) => {
  if (req.decodedObject.role == "user") {
    console.log(req.decodedObject.role);
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

module.exports.isUserOrAdmin = (req, res, next) => {
  if (req.decodedObject.role == "user" || req.decodedObject.role == "admin") {
    console.log(req.decodedObject.role);
    next();
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};
