import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

const secretkey = process.env.SECRET_KEY;

export const verifytoken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "token is required" });
  }

  
  const token = authHeader.split(" ")[1];
  console.log(token,"koko");
  jwt.verify(token, secretkey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "unauthorized token" });
    }
    console.log("decoded", decoded);
    req.user = decoded;
    next();
  });
};
