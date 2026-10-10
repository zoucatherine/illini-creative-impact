import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <h1>Welcome to Your New React App</h1>
        <p>Your responsive TypeScript navbar is ready.</p>
      </main>
      <Footer />
    </div>
  );
}

export default App;