import express from "express";
import {
  makeReservation,
  getReservationByOwnerID
} from "../controllers/reservation.controller";

const Router = express.Router();

Router.get("/reservation/:_ownerID", getReservationByOwnerID);
Router.post("/reservation/:_fieldID", makeReservation);

export default Router;