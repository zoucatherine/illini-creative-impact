import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import HomeBody from './components/HomeBody';
import EventsPage from './pages/EventsPage';
import AboutPage from './pages/AboutPage';
import MediaPage from './pages/MediaPage';
import { StarterPage } from './pages/Pages';
import './index.css';
import './App.css';

function getCurrentPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/';
}

function App() {
  const [currentPath, setCurrentPath] = React.useState(getCurrentPath);

  React.useEffect(() => {
    const handlePopState = () => setCurrentPath(getCurrentPath());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const isHomePage = currentPath === '/';

  return (
    <div className="App">
      <Navbar />
      <main>
        {isHomePage ? (
          <>
            <Hero />
            <HomeBody />
          </>
        ) : currentPath === '/events' ? (
          <EventsPage />
        ) : currentPath === '/about' ? (
          <AboutPage />
        ) : currentPath === '/media' ? (
          <MediaPage />
        ) : (
          <StarterPage path={currentPath} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;