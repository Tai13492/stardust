import express from "express";
import { addOwner, getOwnerByID } from "../controllers/owner.controller";
const Router = express.Router();

Router.post("/owner", addOwner);
Router.get("/owner/:_id", getOwnerByID);
// router.put("/owner");

export default Router;
