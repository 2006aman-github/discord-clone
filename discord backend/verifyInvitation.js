const jwt = require("jsonwebtoken");

const invite = async (req, res, next) => {
  const token = req.header("inviteId");

  if (!token)
    return res.status(401).json({
      message: "Access Denied",
    });
  try {
    const verified = await jwt.verify(token, process.env.TOKEN_INVITE_SECRET);

    req.invite = verified;
    next();
  } catch {
    return res.status(403).json({
      messsage: "Invalid Token",
    });
  }
};

module.exports.verifyInvite = invite;
