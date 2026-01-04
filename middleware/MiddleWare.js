import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Log only what you need
  console.log("Headers:", req.headers);
  console.log("Cookies:", req.cookies);
  console.log("URL:", req.url);
  console.log("Method:", req.method);

  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
