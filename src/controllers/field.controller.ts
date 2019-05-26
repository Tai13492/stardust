import Field, { IField } from "../models/Field";
import { Document } from "mongoose";
import { Request, Response } from "express";

interface ICreateFieldInputs {
  name: IField["name"];
  owner: IField["owner"];
}

export const addMultipleFields = (req: Request, res: Response) => {
  const fields: ICreateFieldInputs[] = req.body.fields;
  Field.create(fields, (error: any, fields: Array<Document>) => {
    if (error) res.status(400).json({ error });
    return res.json({ fields });
  });
};

export const getFieldsByOwnerID = async (req: Request, res: Response) => {
  const _id: String = req.params._id;
  const fields: Array<Document> = await Field.find({ owner: _id });
  res.json({ fields });
};
