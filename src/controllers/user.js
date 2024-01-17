import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const SIGN_UP = async (req, res) => {
  const hasAtSymbol = req.body.email.includes("@");
  if (!hasAtSymbol) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // /d atitinka bet kuri sk 0-9

  const hasNumber = /\d/.test(req.body.password);
  if (!hasNumber) {
    return res
      .status(400)
      .json({ message: "Password must contain at least one number" });
  }

  const salt = bcrypt.genSaltSync(10);

  const hash = bcrypt.hashSync(req.body.password, salt);

  try {
    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      money_balance: req.body.money_balance,
      bought_tickets: req.body.bought_tickets,
    });

    const response = await user.save();

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    const refresh_token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_REFTESH_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(201).json({
      message: "User was created",
      user: response,
      jwt: token,
      refreshtoken: refresh_token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const LOGIN = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: "Wrong email or password" });
    }

    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Wrong email or password" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    const refresh_token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_REFTESH_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({ jwt: token, refreshtoken: refresh_token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const RENEW_TOKEN = (req, res) => {
  const refreshToken = req.headers.refresh;

  if (!refreshToken) {
    return res.status(401).json({ message: "User is not authorized" });
  }

  jwt.verify(refreshToken, process.env.JWT_REFTESH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { email: decoded.email, id: decoded.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    return res.status(200).json({ jwt: newAccessToken });
  });
};

const GET_ALL_USERS = async (req, res) => {
  try {
    const users = await UserModel.find().sort({ name: 1 });
    return res.status(200).json({ users: users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const GET_USER_BY_ID = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    return res.status(200).json({ user: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { SIGN_UP, LOGIN, RENEW_TOKEN, GET_ALL_USERS, GET_USER_BY_ID };
