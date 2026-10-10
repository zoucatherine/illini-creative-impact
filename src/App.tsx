import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { HeroGalleryBehind } from './components/HeroGallery';
import exhibitGroupImage from './assets/hero-images/exibit-group.jpg';
import quadDayImage from './assets/hero-images/2026-quad-day.jpg';
import valentinesSocialImage from './assets/hero-images/valentines-social.jpg';
import './index.css';
import './App.css';

const artExhibitionImage = new URL(
  './assets/hero-images/art-exhibition.JPG',
  import.meta.url,
).href;

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <HeroGalleryBehind
          title="Creativity Meets Impact"
          subtitle="Join us in making a difference through creativity. Explore our events, join our community, and see the impact of creative collaboration."
          images={[
            { id: 'art-exhibition', src: artExhibitionImage, alt: 'Art exhibition' },
            { id: 'exhibit-group', src: exhibitGroupImage, alt: 'Creative group exhibit' },
            { id: 'quad-day', src: quadDayImage, alt: 'Quad Day event' },
            { id: 'valentines-social', src: valentinesSocialImage, alt: 'Valentine’s social event' },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;