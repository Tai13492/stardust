import { Request, Response } from "express";
import { Document } from "mongoose";
import Field, { IField } from "../models/Field";
import User, { IUser } from "../models/User";
import { IOwner } from "../models/Owner";
import Reservation, { IReservation } from "../models/Reservation";

interface ICreateUser {
  name: IUser["name"];
  phone: IUser["phone"];
}

interface ICreateReservation {
  user: IReservation["user"];
  field: IReservation["field"];
  start_time: IReservation["start_time"];
  end_time: IReservation["end_time"];
}

export const getReservationByOwnerID = async (req: Request, res: Response) => {
  const _ownerID: IOwner["_id"] = req.params._ownerID;
  const fields: Array<IField["_id"]> = await Field.find({
    owner: _ownerID
  }).select("_id");
  Reservation.find()
    .where("reservation.field")
    .in(fields)
    .exec((error: any, records: Document) => {
      if (error) res.status(500).json({ error });
      return res.json({ reservation: records });
    });
};

export const makeReservation = async (req: Request, res: Response) => {
  try {
    const _fieldID: IField["_id"] = req.params._fieldID;

    const {
      name,
      phone,
      start_time,
      end_time
    }: {
      name: ICreateUser["name"];
      phone: ICreateUser["phone"];
      start_time: ICreateReservation["start_time"];
      end_time: ICreateReservation["end_time"];
    } = req.body;

    const user: Document | null = await createUserOrGetUserIfExists(
      { name, phone },
      res
    );
    if (user) {
      const _userID: IUser["_id"] = user._id;
      const newReservation: Document = new Reservation({
        user: _userID,
        field: _fieldID,
        start_time,
        end_time
      });

      const completedReservation: Document = await newReservation.save();
      res.json({ reservation: completedReservation });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const createUserOrGetUserIfExists = async (
  data: ICreateUser,
  res: Response
) => {
  const { name, phone } = data;
  try {
    const user = await User.findOne({ name, phone });
    if (user) return user;
    const newUser: Document = new User({ name, phone });
    const savedUser: Document = await newUser.save();
    return savedUser;
  } catch (error) {
    res.status(500).json({ error });
    return null;
  }
};
