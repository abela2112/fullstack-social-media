import jwt from "jsonwebtoken";
const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    
    if (!token) throw new Error(`Access denied`);
    else if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified;
    
    next();
  } catch (err) {
    console.log(err);
  }
};
export default verifyToken;
