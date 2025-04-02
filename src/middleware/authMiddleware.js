const jwt = require("jsonwebtoken");

const extractEmail = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "muj-iot-rohit-mittal"); // Replace with your secret key
  req.email = decoded.email;
  req.role = decoded.role;
  next();
};

module.exports = { extractEmail };