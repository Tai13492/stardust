import express from "express";
import {
  addMultipleFields,
  getFieldsByOwnerID
} from "../controllers/field.controller";

const Router = express.Router();

Router.post("/fields", addMultipleFields);
Router.get("/fields/:_id", getFieldsByOwnerID);

export default Router;
