import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema(
  {
    xCoordinate: {
      type: Number,
      required: true,
    },
    yCoordinate: {
      type: Number,
      required: true,
    },
    events: {
        type: Boolean,
        required: true,
      },
    description: {
      type: String,
      required: true,
    },
    background: {
        type: String,
        required: true,
      },
  },
  { versionKey: false, timestamps: true }
);

const Location = mongoose.model("Location", LocationSchema);

export default Location;