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
    createdBy: {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      guest: String,
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
    expiryAt: Date,
  },
  { timestamps: true }
);

export const Url = mongoose.model("Url", urlSchema);
