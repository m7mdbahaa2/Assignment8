import { userModel, users } from "../../DB/model/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../../config/config.service.js";
// export const profile = (id) => {
//   const user = users.find((ele) => ele.id == id);
//   return user;
// };

export const signUp = async (inputs) => {
  const { firstName, lastName, email, password } = inputs;
  const hashedPassword = await bcrypt.hash(password, 10);

  const checkEmail = await userModel.findOne({ email });
  if (checkEmail) {
    throw new Error("email is exist");
  }

  const user = await userModel.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  return user;
};

export const login = async (inputs) => {
  const { email, password } = inputs;
  const emailExist = await userModel.findOne({ email });
  if (!emailExist) {
    throw new Error("Invalid Data");
  }

  const passCheck = await bcrypt.compare(password, user.password);
  if (!passCheck) {
    throw new Error("Invalid Data");
  }

  const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
    expiresIn: "1h",
  });

  return token;
};

export const update = async (userID, inputs) => {
  const { firstName, lastName, email } = inputs;

  const checkEmail = await userModel.findOne({ email });
  if (checkEmail) {
    throw new Error("Email is exist!");
  }

  const auth = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "Token required" });
    }

    const token = header.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { userId: decoded.userId };
      next();
    } catch {
      return res.status(401).json({ message: "Invalid token" });
    }
  };

  const user = await userModel.findByIdAndUpdate(
    userId,
    { firstName, lastName, email },
    { new: true },
  );

  return user;
};

export const deleteUser = async (userId) => {
  const user = await userModel.findByIdAndDelete(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const getProfile = async (userId) => {
  const user = await userModel.findById(userId); 

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
