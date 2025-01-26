import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {

    const token = req.headers["authorization"].split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided",login:false });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token. Authorization denied" });
  }
};
