import db from "../db.js";

export const getUser = (req, res) => {
  const q = "SELECT * FROM users";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const getProfileUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=? ";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(404).json(err);

    return res.json(data);
  });
};
