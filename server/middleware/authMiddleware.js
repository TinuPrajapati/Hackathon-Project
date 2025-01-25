import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    // Get token from cookies or headers
    const cookieName  = process.env.COOKIE_SECRET;
    const token = req.cookies[cookieName];

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token. Authorization denied" });
  }
};
