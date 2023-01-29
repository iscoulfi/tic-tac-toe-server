import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { Server } from 'socket.io';

import roomsRoute from './routes/rooms.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('uploads'));

app.use('/api/room', roomsRoute);

async function startApp() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.vtzfo2y.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    );
  } catch (error) {
    console.log(error.message);
  }
}
startApp();

const server = app.listen(PORT, () =>
  console.log(`Server started on port: ${PORT}`)
);

const io = new Server(server, {
  cors: {
    origin: process.env.SERV_ORIGIN,
    credentials: true,
  },
});

io.on('connection', socket => {
  socket.on('reqTurn', data => {
    const room = JSON.parse(data).room;
    io.to(room).emit('playerTurn', data);
  });

  socket.on('create', room => {
    socket.join(room);
  });

  socket.on('join', room => {
    socket.join(room);
    io.to(room).emit('opponent_joined');
  });

  socket.on('reqRestart', data => {
    const room = JSON.parse(data).room;
    io.to(room).emit('restart');
  });
});
