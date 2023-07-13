const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  const authHeader = req.headers.authentication;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Authentication required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    console.error("Error while verifying token:", error);
    res.status(403).send({ message: "Invalid token" });
  }
};

module.exports = {
  authentication,
};
