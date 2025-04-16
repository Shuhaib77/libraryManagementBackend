import { loginService, registerService } from "../service/authService.js";

export const register = async (req, res) => {
  const { email, password, name } = req.body;
  console.log(email, password, name, "cntrler");

  if (!email || !password || !name) {
    return res.status(404).json({ message: "all fields are requird!" });
  }
  const data = await registerService(email, password, name);
  if (!data) {
    return res.status(404).json({ message: "register failed!" });
  }
  res.status(201).json({ message: "register successfull!", data: data });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password, "cntrler");

  if (!email || !password) {
    return res.status(404).json({ message: "all fields are requird!" });
  }
  const data = await loginService(email, password);

  if (!data) {
    return res.status(404).json({ message: "login failed!" });
  }
  const { user, token } = data;
  console.log(user, token);
  res
    .status(200)
    .json({ message: "Login successfull!", data: user, token: token });
};
