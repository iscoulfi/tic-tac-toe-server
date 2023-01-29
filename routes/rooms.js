import { Router } from 'express';
import { addRoom, getRooms, removeRoom } from '../controlers/rooms.js';

const router = new Router();

// http://localhost:5000/api/room/addroom
router.post('/addroom', addRoom);

// http://localhost:5000/api/room/getrooms
router.get('/getrooms', getRooms);

// http://localhost:5000/api/room/:room
router.delete('/:room', removeRoom);

export default router;
