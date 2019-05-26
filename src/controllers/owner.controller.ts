import Owner from "../models/Owner";
import { Request, Response } from "express";

export const addOwner = async (req: Request, res: Response) => {
  try {
    const newOwner = new Owner(req.body);
    await newOwner.save();
    res.json({ msg: "success" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getOwnerByID = async (req: Request, res: Response) => {
  try {
    const _id: String = req.params._id;
    const owner = await Owner.findById({ _id });
    res.json({ owner });
  } catch (error) {
    res.status(400).json({ error });
  }
};
