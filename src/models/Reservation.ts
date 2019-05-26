import mongoose from "mongoose";
import { IUser } from "./User";
import { IField } from "./Field";

const Schema = mongoose.Schema;

export interface IReservation extends mongoose.Document {
  user: IUser["_id"];
  field: IField["_id"];
  start_time: Date;
  end_time: Date;
}

const Reservation = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  field: {
    type: Schema.Types.ObjectId,
    ref: "field"
  },
  start_time: {
    type: Date,
    required: true
  },
  end_time: {
    type: Date,
    required: true
  }
});

export default mongoose.model("reservation", Reservation);
