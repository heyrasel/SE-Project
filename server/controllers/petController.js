import pool from '../config/db.js';

export const createPet = async (req, res) => {
  const { name, type, age, breed, description } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO pets (owner_id, name, type, age, breed, description) VALUES (?, ?, ?, ?, ?, ?)', [req.user.id, name, type, age, breed, description]);
    res.status(201).json({ id: result.insertId, name, type, age, breed, description });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPets = async (req, res) => {
  try {
    const [pets] = await pool.query('SELECT * FROM pets WHERE owner_id = ?', [req.user.id]);
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPetById = async (req, res) => {
  try {
    const [pets] = await pool.query('SELECT * FROM pets WHERE id = ? AND owner_id = ?', [req.params.id, req.user.id]);
    if (pets.length === 0) return res.status(404).json({ message: 'Pet not found' });
    res.json(pets[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePet = async (req, res) => {
  const { name, type, age, breed, description } = req.body;
  try {
    await pool.query('UPDATE pets SET name=?, type=?, age=?, breed=?, description=? WHERE id=? AND owner_id=?', [name, type, age, breed, description, req.params.id, req.user.id]);
    res.json({ message: 'Pet updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePet = async (req, res) => {
  try {
    await pool.query('DELETE FROM pets WHERE id=? AND owner_id=?', [req.params.id, req.user.id]);
    res.json({ message: 'Pet deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
