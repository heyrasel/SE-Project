import React from 'react';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=1400&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '100px 20px',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <h1 style={{ fontSize: '3.2rem', fontWeight: 'bold', marginBottom: '20px' }}>
          Welcome to MovePet 🐾
        </h1>
        <p style={{ fontSize: '1.4rem', maxWidth: '600px', margin: '0 auto' }}>
          Your one-stop platform to connect with pet lovers, caretakers, and vets.
        </p>
        <div style={{ marginTop: '150px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <a href="/register" style={buttonStyleYellow}>Get Started</a>
          <a href="/login" style={buttonStyleDark}>Login</a>
        </div>
      </div>

      {/* Quote Section */}
      <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#f7f9fc' }}>
        <blockquote style={{ fontStyle: 'italic', fontSize: '1.5rem', color: '#444' }}>
          "The greatness of a nation can be judged by the way its animals are treated." — Mahatma Gandhi
        </blockquote>
      </div>

      {/* About Section */}
      <div style={{ padding: '50px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '15px', color: '#2e3a59' }}>
          Why MovePet?
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: '700px', margin: '0 auto' }}>
          MovePet isn't just a service — it's a loving community. From finding reliable walkers and sitters, to booking vet appointments or chatting with fellow pet parents, we’re here for your furry friend.
        </p>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#2e3a59', color: '#fff', padding: '30px 20px', textAlign: 'center' }}>
        <p style={{ marginBottom: '10px' }}>© 2025 MovePet. All rights reserved.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <a href="/about" style={footerLinkStyle}>About</a>
          <a href="/services" style={footerLinkStyle}>Services</a>
          <a href="/contact" style={footerLinkStyle}>Contact</a>
          <a href="/faq" style={footerLinkStyle}>FAQ</a>
        </div>
      </footer>
    </div>
  );
}

// Inline button styles
const buttonStyleYellow = {
  background: '#ffd166',
  color: '#2e3a59',
  fontWeight: 600,
  padding: '12px 28px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontSize: '1.1rem',
  boxShadow: '0 2px 8px #f8fafc',
};

const buttonStyleDark = {
  background: '#2e3a59',
  color: '#fff',
  fontWeight: 600,
  padding: '12px 28px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontSize: '1.1rem',
  boxShadow: '0 2px 8px #f8fafc',
};

// Footer link style
const footerLinkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 500,
};

export default Home;
