import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../modals/userModal.js";
dotenv.config();
const secretKey = process.env.SECRET_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASS = process.env.ADMIN_PASS;

export const registerService = async (email, password, name) => {
  console.log(email, password, name, "registerService");

  if (!email || !password || !name) {
    throw new Error("All fields are required!");
  }

  const check = await User.findOne({ email });
  if (check) {
    throw new Error("This user already exists!");
  }
  const role =
    email === ADMIN_EMAIL && password === ADMIN_PASS ? "admin" : "user";
    console.log(role);
    
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashPassword,
    name,
    role:role,
  });

  return newUser;
};

export const loginService = async (email, password) => {
  console.log(email, password, "cntrler");
  if (!email || !password) {
    throw new Error("alll fields are requird!!");
  }

  const user = await User.findOne({ email: email });

  console.log(user, "kk");
  if (!user) {
    throw new Error(` user not exists!!`);
  }
  const chekPass = await bcrypt.compare(password, user.password);
  if (!chekPass) {
    throw new Error("password incoorect!!");
  }
  const payload = {
    email: email,
    _id: user._id,
  };
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  return { user, token };
};
