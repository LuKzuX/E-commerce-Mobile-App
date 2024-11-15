import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });
    res.json(newUser);
  } catch (error) {
    res.send(error);
  }
};
