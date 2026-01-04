import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {

  console.log(JSON.stringify(req));

  console.log("========================",JSON.stringify(req.headers));


  console.log("------------------------",JSON.stringify(cookies));

  console.log(JSON.stringify(req));

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
