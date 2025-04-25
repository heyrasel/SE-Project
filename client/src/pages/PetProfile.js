import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PetProfile() {
  const [pets, setPets] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  // Fetch pets from backend
  const fetchPets = async () => {
    if (token) {
      try {
        const res = await axios.get('http://localhost:5002/api/pets', { headers: { Authorization: `Bearer ${token}` } });
        setPets(res.data.map(pet => ({ ...pet, editing: false })));
      } catch {
        setError('Failed to fetch pets');
      }
    }
  };

  useEffect(() => {
    fetchPets();
    // eslint-disable-next-line
  }, [token]);

  const handleAddPet = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5002/api/pets', { name, type, age, breed, description }, { headers: { Authorization: `Bearer ${token}` } });
      setName(''); setType(''); setAge(''); setBreed(''); setDescription('');
      fetchPets();
    } catch (err) {
      setError('Failed to add pet');
    }
  };

  // Edit button click
  const handleEditClick = (id) => {
    setPets(pets.map(pet => pet.id === id ? { ...pet, editing: true } : pet));
  };

  // Cancel edit
  const handleCancelEdit = (id) => {
    fetchPets();
  };

  // Handle edit field change
  const handleEditChange = (id, field, value) => {
    setPets(pets.map(pet => pet.id === id ? { ...pet, [field]: value } : pet));
  };

  // Save updated pet
  const handleUpdatePet = async (e, id) => {
    e.preventDefault();
    const pet = pets.find(p => p.id === id);
    try {
      await axios.put(`http://localhost:5002/api/pets/${id}`, {
        name: pet.name,
        type: pet.type,
        age: pet.age,
        breed: pet.breed,
        description: pet.description
      }, { headers: { Authorization: `Bearer ${token}` } });
      fetchPets();
    } catch {
      setError('Failed to update pet');
    }
  };

  // Delete pet
  const handleDeletePet = async (id) => {
    try {
      await axios.delete(`http://localhost:5002/api/pets/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchPets();
    } catch {
      setError('Failed to delete pet');
    }
  };


  return (
    <div>
      <h2>My Pets</h2>
      <form onSubmit={handleAddPet}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="text" placeholder="Type (dog, cat, etc.)" value={type} onChange={e => setType(e.target.value)} />
        <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
        <input type="text" placeholder="Breed" value={breed} onChange={e => setBreed(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <button type="submit">Add Pet</button>
      </form>
      {error && <div className="error">{error}</div>}
      <div style={{marginTop:'24px', display:'grid', gap:'18px'}}>
        {pets.map(pet => (
          <div key={pet.id} style={{background:'#f8fafc', borderRadius:'12px', boxShadow:'0 1px 6px #e0e7ef', padding:'18px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'16px'}}>
            {pet.editing ? (
              <form onSubmit={e => handleUpdatePet(e, pet.id)} style={{display:'flex', gap:'8px', flexWrap:'wrap', alignItems:'center', flex:1}}>
                <input type="text" value={pet.name} onChange={e => handleEditChange(pet.id, 'name', e.target.value)} required placeholder="Name" />
                <input type="text" value={pet.type} onChange={e => handleEditChange(pet.id, 'type', e.target.value)} placeholder="Type" />
                <input type="number" value={pet.age} onChange={e => handleEditChange(pet.id, 'age', e.target.value)} placeholder="Age" />
                <input type="text" value={pet.breed} onChange={e => handleEditChange(pet.id, 'breed', e.target.value)} placeholder="Breed" />
                <input type="text" value={pet.description} onChange={e => handleEditChange(pet.id, 'description', e.target.value)} placeholder="Description" />
                <button type="submit">Save</button>
                <button type="button" onClick={() => handleCancelEdit(pet.id)} style={{background:'#e5e7eb', color:'#222'}}>Cancel</button>
              </form>
            ) : (
              <>
                <div style={{flex:1}}>
                  <div style={{fontWeight:'bold', fontSize:'1.15rem', color:'#2e3a59'}}>{pet.name}</div>
                  <div style={{color:'#555', marginTop:'2px'}}>{pet.type} | {pet.breed} | Age: {pet.age}</div>
                  <div style={{color:'#888', fontSize:'0.97rem', marginTop:'3px'}}>{pet.description}</div>
                </div>
                <div style={{display:'flex', gap:'10px'}}>
                  <button onClick={() => handleEditClick(pet.id)} style={{background:'#ffd166', color:'#2e3a59'}}>Edit</button>
                  <button onClick={() => handleDeletePet(pet.id)} style={{background:'#e63946', color:'#fff'}}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PetProfile;
