/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import {
  getDream,
  addDream,
  updateDream,
  deleteDream,
} from "./controllers/dreamController";

import { PORT } from "./config";

import { login, register, signout } from "./controllers/authController";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const MONGODB_URI = process.env.MONGODB;

if (!MONGODB_URI) {
  console.error(
    "MongoDB URI is not defined. Make sure to set the MONGODB environment variable."
  );
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => console.log("Could not connect to MongoDB...", error));

// const dreams = [
// {
//   id: 0,
//   title: "Running from volcanic eruption",
//   description: "I was running.",
// },
//   {
//     id: 1,
//     title: "Purple Alien",
//     description: "I saw an alien for the first time.",
//   },
// ];

app.get("/", (req, res) => {
  res.send({ message: "Server home." });
});

app.get("/dreams", getDream);

app.post("/addDream", addDream);

app.put("/updateDream", updateDream);

app.post("/deleteDream", deleteDream);

app.post("/login", login);

app.post("/register", register);

app.post("/signout", signout);

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
