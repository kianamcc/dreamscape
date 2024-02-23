import { Request, Response } from "express";
import dreamModel from "../models/dreamModel";

export const getDream = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ error: "User ID is required to get dreams." });
    }
    const dreams = await dreamModel.find({ user: userId });
    res.json(dreams);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
};

export const addDream = (req: Request, res: Response) => {
  const { _id, title, description, userId } = req.body;
  console.log("user id in add dream", userId);

  dreamModel
    .create({ _id, title, description, user: userId })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log("Error saving dream to database...", error);
      res.status(500).json(error);
    });
};

export const updateDream = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { _id, title, description } = req.body;

  try {
    const updatedDream = await dreamModel.findByIdAndUpdate(
      _id,
      { title, description },
      { new: true }
    );

    if (!updatedDream) {
      res.status(404).json({ error: "Dream not found" });
      return;
    }

    res.json(updatedDream);
  } catch (error) {
    console.error("Error updating dream...");
    res.status(500).json(error);
  }
};

export const deleteDream = (req: Request, res: Response) => {
  const { _id } = req.body;

  dreamModel
    .findByIdAndDelete(_id)
    .then(() => res.status(200).json({ message: "Dream deleted successfully" }))
    .catch((error) => {
      console.log("Error deleting dream...");
      res.status(500).json(error);
    });
};
