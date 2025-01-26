import jwt from "jsonwebtoken";

// Helper function to generate JWT token
const generateToken = (user,res) => {
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" } // Token valid for 7 days
  );

  res.cookie(process.env.COOKIE_SECRET, token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

export default generateToken;