import mongoose, { Document } from "mongoose";

export interface Dream extends Document {
  id: number;
  title: string;
  description: string;
}

const dreamSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

export default mongoose.model("Dream", dreamSchema);
