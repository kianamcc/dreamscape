import mongoose, { Document, Schema } from "mongoose";

export interface Dream extends Document {
  id: number;
  title: string;
  description: string;
  user: Schema.Types.ObjectId;
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
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Dream", dreamSchema);
