const { func } = require("joi");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.header("jwt");
  if (!token)
    return res.statue(401).json({
      message: "Access Denied",
    });
  try {
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch {
    return res.status(400).json({
      messsage: "Invalid Token",
    });
  }
};

module.exports.verify = auth;
