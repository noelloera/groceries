const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const header = req.headers["authorization"];
  const access = header && header.split(" ")[1];
  if (!access) res.status(401).send({ errors: "invalid access" });
  try {
    jwt.verify(access, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error) {
        res.status(400).send({ errors: "invalid access" });
      }
      req.body.id = user.id;
      next();
    });
  } catch (err) {
    res.status(500).send({ errors: "invalid access" });
  }
};
