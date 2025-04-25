import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [pets, setPets] = useState([]);
  const [caretakerId, setCaretakerId] = useState('');
  const [vetId, setVetId] = useState('');
  const [serviceType, setServiceType] = useState('pet_care');
  const [petId, setPetId] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5002/api/bookings', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setBookings(res.data));
      axios.get('http://localhost:5002/api/pets', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setPets(res.data));
    }
  }, [token]);

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5002/api/bookings', {
        pet_id: petId,
        caretaker_id: serviceType === 'pet_care' ? caretakerId : undefined,
        vet_id: serviceType === 'vet_appointment' ? vetId : undefined,
        service_type: serviceType,
        date,
        notes
      }, { headers: { Authorization: `Bearer ${token}` } });
      setMessage('Booking created!');
      setPetId(''); setCaretakerId(''); setVetId(''); setDate(''); setNotes('');
      // Refresh bookings
      const res = await axios.get('http://localhost:5002/api/bookings', { headers: { Authorization: `Bearer ${token}` } });
      setBookings(res.data);
    } catch (err) {
      setMessage('Failed to create booking');
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5002/api/bookings/${id}/status`, { status: newStatus }, { headers: { Authorization: `Bearer ${token}` } });
      const res = await axios.get('http://localhost:5002/api/bookings', { headers: { Authorization: `Bearer ${token}` } });
      setBookings(res.data);
    } catch {
      setMessage('Failed to update status');
    }
  };

  return (
    <div>
      <h2>Book a Service</h2>
      <form onSubmit={handleCreateBooking}>
        <select value={petId} onChange={e => setPetId(e.target.value)} required>
          <option value=''>Select Pet</option>
          {pets.map(pet => <option key={pet.id} value={pet.id}>{pet.name}</option>)}
        </select>
        <select value={serviceType} onChange={e => setServiceType(e.target.value)} required>
          <option value="pet_care">Pet Care</option>
          <option value="vet_appointment">Vet Appointment</option>
        </select>
        {serviceType === 'pet_care' && (
          <input type="number" placeholder="Caretaker User ID" value={caretakerId} onChange={e => setCaretakerId(e.target.value)} required />
        )}
        {serviceType === 'vet_appointment' && (
          <input type="number" placeholder="Vet User ID" value={vetId} onChange={e => setVetId(e.target.value)} required />
        )}
        <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required />
        <input type="text" placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
        <button type="submit">Book</button>
      </form>
      {message && <p>{message}</p>}
      <h2>My Bookings</h2>
      <table border="1">
          <thead>
          <tr>
            <th>ID</th><th>Pet</th><th>Service</th><th>Date</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.pet_id}</td>
              <td>{b.service_type}</td>
              <td>{b.date}</td>
              <td>{b.status}</td>
              <td>
                  {b.status === 'pending' && (
                    <>
                      <button onClick={() => handleStatusUpdate(b.id, 'confirmed')}>Confirm</button>
                    <button onClick={() => handleStatusUpdate(b.id, 'cancelled')}>Cancel</button>
                    </>
                  )}
                  {b.status === 'confirmed' && (
                  <button onClick={() => handleStatusUpdate(b.id, 'completed')}>Complete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}

export default Booking;
