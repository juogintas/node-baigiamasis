import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true, min: 1 },
  email: { type: String, required: true, min: 1 },
  password: { type: String, required: true, min: 1 },
});

export default mongoose.model("User", userSchema);
