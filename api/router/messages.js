import express from "express";
import {
  getMessage,
  getUserMessage,
  sendMessage,
} from "../controller/message.js";

const router = express.Router();

router.get("/messages", getMessage);
router.get("/usermessage", getUserMessage);
router.post("/usermessage", sendMessage);

export default router;
