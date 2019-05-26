import express from "express";
import owner from "./owner.route";
import field from "./field.route";
import reservation from "./reservation.route";

const router = express.Router();

router.use("/api", [owner, field, reservation]);

export default router;
