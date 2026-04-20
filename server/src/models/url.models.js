import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema(
  {
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    userIpAddress: String,
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    visits: [
      {
        ipAddress: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Url = mongoose.model("Url", urlSchema);
