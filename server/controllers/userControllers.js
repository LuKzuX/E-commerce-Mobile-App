import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { addressObject, checkAreaCodeFormat } from "../utils/userUtils.js";

export const createUser = async (req, res, next) => {
  try {
    const { username, password, email, country } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const countryFormatObject = addressObject(country);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      address: countryFormatObject,
    });
    res.json(newUser);
  } catch (error) {
    res.send(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send("this user does not exist");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).send("incorrect password");
    }

    const token = jwt.sign({ user }, process.env.SECRET);
    req.userId = user._id;

    return res.json({ user, token });
  } catch (error) {
    return res.status(401).send(error);
  }
};

export const updateUserInfo = async (req, res, next) => {
  try {
    const { _id } = req.user.user;
    const {
      username,
      password,
      email,
      country,
      areaCode,
      city,
      street,
      state,
    } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await User.findByIdAndUpdate(
      { _id: _id },
      {
        $set: {
          username,
          password: hashedPassword,
          email,
          address: {
            country,
            state,
            city,
            street,
            areaCode: checkAreaCodeFormat(country, areaCode),
          },
        },
      },
      { new: true, runValidators: true }
    );
    res.json(user);
  } catch (error) {
    res.json({ error: error.message });
  }
};
