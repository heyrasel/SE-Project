import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PetProfile from './pages/PetProfile';
import Booking from './pages/Booking';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <nav style={{background:'#fff', borderBottom:'1px solid #e0e7ef', padding:'12px 0', marginBottom:'18px', display:'flex', justifyContent:'center', gap:'18px'}} aria-label="Main navigation">
        <NavLink to="/" label="Home" currentPath={location.pathname} />
        {!isAuthenticated && <NavLink to="/login" label="Login" currentPath={location.pathname} />}
        {!isAuthenticated && <NavLink to="/register" label="Register" currentPath={location.pathname} />}
        {isAuthenticated && <NavLink to="/pets" label="My Pets" currentPath={location.pathname} />}
        {isAuthenticated && <NavLink to="/bookings" label="Bookings" currentPath={location.pathname} />}
        {isAuthenticated && <button onClick={handleLogout} style={{background:'#e63946', color:'#fff', border:'none', borderRadius:'6px', padding:'7px 18px', fontWeight:600, cursor:'pointer'}}>Logout</button>}
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<LoginRedirectIfAuth />} />
          <Route path="/register" element={<RegisterWithRedirect />} />
          <Route path="/pets" element={isAuthenticated ? <PetProfile /> : <Login />} />
          <Route path="/bookings" element={isAuthenticated ? <Booking /> : <Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

function NavLink({ to, label, currentPath }) {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      style={{
        color: isActive ? '#ffd166' : '#2e3a59',
        background: isActive ? '#2e3a59' : 'transparent',
        borderRadius: '6px',
        padding: '7px 18px',
        textDecoration: 'none',
        fontWeight: 600,
        transition: 'background 0.2s',
      }}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </Link>
  );
}

// Redirect to /pets if already logged in
function LoginRedirectIfAuth() {
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  const navigate = useNavigate();
  React.useEffect(() => {
    if (isAuthenticated) navigate('/pets');
  }, [isAuthenticated, navigate]);
  return <Login />;
}

// Redirect to /pets after successful register
function RegisterWithRedirect() {
  const [registered, setRegistered] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (registered) {
      setTimeout(() => navigate('/pets'), 1200);
    }
  }, [registered, navigate]);
  return <Register onSuccess={() => setRegistered(true)} />;
}

function NotFound() {
  return (
    <div style={{textAlign:'center', marginTop:'80px'}}>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" style={{color:'#ffd166', fontWeight:600}}>Go Home</Link>
    </div>
  );
}


export default App;
