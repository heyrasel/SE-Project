import pool from '../config/db.js';

// Create a new booking (pet care or vet appointment)
export const createBooking = async (req, res) => {
  const { pet_id, caretaker_id, vet_id, service_type, date, notes } = req.body;
  try {
    // Only one of caretaker_id or vet_id should be set based on service_type
    const [result] = await pool.query(
      'INSERT INTO bookings (pet_id, owner_id, caretaker_id, vet_id, service_type, date, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [pet_id, req.user.id, caretaker_id || null, vet_id || null, service_type, date, notes]
    );
    res.status(201).json({ id: result.insertId, pet_id, caretaker_id, vet_id, service_type, date, notes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get bookings for the logged-in user (as owner, caretaker, or vet)
export const getBookings = async (req, res) => {
  try {
    let query = 'SELECT * FROM bookings WHERE owner_id = ? OR caretaker_id = ? OR vet_id = ?';
    const [bookings] = await pool.query(query, [req.user.id, req.user.id, req.user.id]);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  try {
    await pool.query('UPDATE bookings SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ message: 'Booking status updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
