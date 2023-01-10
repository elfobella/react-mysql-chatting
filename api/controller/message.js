import db from "../db.js";
import jwt from "jsonwebtoken";

export const getMessage = (req, res) => {
  const q = "SELECT * FROM messages";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
};

export const getUserMessage = (req, res) => {
  const token = req.cookies.access_token;
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    const q =
      "SELECT `desc`, `userFromId`,`userToId`,u.id AS uId, u.name AS uName FROM messages m JOIN users u ON (m.userFromId = u.id OR m.userToId = u.id) WHERE u.id = ? ";

    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.json(err);

      return res.json(data);
    });
  });
};

export const sendMessage = (req, res) => {
  const token = req.cookies.access_token;
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    const q =
      "INSERT INTO messages(`desc`,`userToId`, `userFromId`) VALUES(?) ";
    const values = [req.body.desc, req.body.userToId, userInfo.id];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);

      return res.status(200).json("Message sended.");
    });
  });
};
