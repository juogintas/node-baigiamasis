import express from "express";
import { INSTERT_TICKET, BUY_TICKET } from "../controllers/ticket.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/tickets", auth, INSTERT_TICKET);

router.post("/ticket/buy", auth, BUY_TICKET);

export default router;
