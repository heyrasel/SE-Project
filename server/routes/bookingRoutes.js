import express from 'express';
import { createBooking, getBookings, updateBookingStatus } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new booking (pet care or vet appointment)
router.post('/', protect, createBooking);

// Get bookings for the logged-in user (owner, caretaker, or vet)
router.get('/', protect, getBookings);

// Update booking status (confirm, complete, cancel)
router.put('/:id/status', protect, updateBookingStatus);

export default router;
