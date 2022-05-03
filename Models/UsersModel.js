import mongoose from "mongoose";

// create schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  blogs: [{ type: mongoose.Types.ObjectId, ref: "blog", required: true }],
});

export default mongoose.model("user", userSchema);
