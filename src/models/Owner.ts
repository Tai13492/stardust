import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IOwner extends mongoose.Document {
  username: String;
  password: String;
  opening_time: String;
  closing_time: String;
  field_name: String;
  latitude: Number;
  longitude: Number;
  phone: String;
}

const Owner = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  opening_time: {
    type: String
  },
  closing_time: {
    type: String
  },
  field_name: {
    type: String
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  phone: {
    type: String
  }
});

export default mongoose.model<IOwner>("owner", Owner);
