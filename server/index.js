import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import petRoutes from './routes/petRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
// import other routes as needed

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/bookings', bookingRoutes);
// app.use('/api/forums', forumRoutes);
// app.use('/api/vets', vetRoutes);
// app.use('/api/store', storeRoutes);

app.get('/', (req, res) => {
  res.send('MovePet API is running');
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
