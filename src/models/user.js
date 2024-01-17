import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true, min: 1 },
  email: { type: String, required: true, min: 1 },
  password: { type: String, required: true, min: 6 },
  money_balance: { type: Number, required: true },
  bought_tickets: { type: Object, required: true },
});

export default mongoose.model("User", userSchema);
