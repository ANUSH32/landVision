import mongoose from 'mongoose';

const userResponseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  responses: [
    {
      questionIndex: {
        type: Number,
        required: true
      },
      selectedOption: {
        type: String,
        required: true
      }
    }
  ]
}, { timestamps: true });

export default mongoose.models.UserResponse || mongoose.model('userResponse', userResponseSchema);
