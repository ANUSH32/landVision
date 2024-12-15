import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    history: [
      {
        role: {
          type: String,
          enum: ["user", "assistant"],
          required: true
        },
        parts: [
          {
            text: {
              type: String,
              required: true
            }
          }
        ]
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.Chat || mongoose.model("Chat", chatSchema);
