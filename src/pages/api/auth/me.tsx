import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "models/User";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "utils/mongodb";
import middlewareTokenVerify from "../middlewares/tokenVerify";
const message = require("../../../utils/messages");

dbConnect();

async function generateToken(params) {
  const token = jwt.sign({ params }, process.env.SECRET_KEY);
  return token;
}

export default async function (req, res) {
  const { authorization } = req.headers;

  try {
    await middlewareTokenVerify(authorization, req, res);

    if (req.userId) {
      const user = await User.findById(req.userId);

      if (!user) {
        res.status(400).send(message(2));
      }

      user.password = undefined;
      user.confirmPassword = undefined;

      const token = await generateToken({ id: user._id });

      res.status(200).send(message(0, { user: user, token: token }));
    }
  } catch (error) {
    res.status(400).send(message(1));
  }
}
