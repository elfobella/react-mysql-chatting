import db from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE name=?";

  db.query(q, [req.body.name], (err, data) => {
    if (data.length === 0) return res.status(404).json("User not found.");

    //compare
    const isCorrectPassword = bcrypt.compare(
      req.body.password,
      data[0].password
    );

    if (!isCorrectPassword)
      return res.status(400).json("Wrong username or password.");

    //JWT Token
    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, email, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};


export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};
