import express from "express";
import {
  SIGN_UP,
  LOGIN,
  RENEW_TOKEN,
  GET_ALL_USERS,
  GET_USER_BY_ID,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/users/signUp", SIGN_UP);

router.post("/users/logIn", LOGIN);

router.post("/users/logIn/renew", RENEW_TOKEN);

router.get("/users", auth, GET_ALL_USERS);

router.get("/users/:id", auth, GET_USER_BY_ID);

export default router;
