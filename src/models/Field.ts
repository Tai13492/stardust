import mongoose from "mongoose";
import { IOwner } from "./Owner";

const Schema = mongoose.Schema;

export interface IField extends mongoose.Document {
  name: String;
  owner: IOwner["_id"];
}

const Field = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "owner",
    required: true
  }
});

export default mongoose.model("field", Field);
