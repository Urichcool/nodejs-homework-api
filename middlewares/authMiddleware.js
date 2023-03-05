const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const [tokenType, token] = req.headers["authorization"];
    
    

  if (!token) {
    return null;
  }

  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;
    next();
  } catch {
    return null;
  }
};

module.exports = {
  authMiddleware,
};
