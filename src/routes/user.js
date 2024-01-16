import express from "express";
import { SIGN_UP, LOGIN } from "../controllers/user.js";

const router = express.Router();

router.post("/users/signUp", SIGN_UP);

router.post("/users/logIn", LOGIN);

export default router;
