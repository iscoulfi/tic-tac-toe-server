import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema(
  {
    room: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

export default mongoose.model('Rooms', RoomSchema);
