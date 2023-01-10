import db from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q =
    "SELECT *,e.name, u.name AS uName FROM exercises e JOIN users u ON (e.userId = u.id) ";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    const q = "INSERT INTO exercises(`desc`,`img`)";

    db.query(q, [req.body.desc, req.body.img], (err, data) => {
      if (err) return res.json(err);

      return res.json(data);
    });
  });
};
