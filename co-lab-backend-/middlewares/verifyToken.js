import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  console.log("reached here");
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized, please login first",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized- invalid token",
      });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized - invalid or expired token",
    });
  }
};
