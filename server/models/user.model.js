import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: 2,
      required: "Name is required",
    },
    email: {
      type: String,
      trim: true,
      unique: "Email already exist",
      match: [/.+\@.+\..+/, "Please provide a valid email address"],
      required: "Email is required",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
