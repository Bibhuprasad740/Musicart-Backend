const jwt = require("jsonwebtoken");

const checkAuthorization = (req, res, next) => {
  const tokenParam = req.headers["authorization"];

  if (!tokenParam) {
    return res.status(400).send("No auth token found!");
  }

  const token = tokenParam.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res
        .status(400)
        .send("Invalid authorization token! Please sign in again.");
    }
    req.userId = user._id;
    next();
  });
};

module.exports = checkAuthorization;
