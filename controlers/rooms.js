import Room from '../models/Room.js';

export const addRoom = async (req, res) => {
  try {
    const { room } = req.body;
    const data = new Room({
      room,
    });
    await data.save();

    res.json({
      data,
    });
  } catch (error) {
    res.json({ message: 'Create room error.' });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});

    res.json({
      rooms,
    });
  } catch (error) {
    res.json("don't know wtf happened");
  }
};

export const removeRoom = async (req, res) => {
  try {
    const room = await Room.findOneAndDelete({ room: req.params.room });

    if (!room) {
      res.json({ message: "This room doesn't exist." });
      return;
    }

    res.json({ message: 'Room deleted.' });
  } catch (error) {
    res.json({ message: 'Something went wrong.' });
  }
};
