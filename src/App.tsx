import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import HomeBody from './components/HomeBody';
import EventsPage from './pages/EventsPage';
import AboutPage from './pages/AboutPage';
import MediaPage from './pages/MediaPage';
import WorkPage from './pages/WorkPage';
import ProjectPage from './pages/ProjectPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import PartnerPage from './pages/PartnerPage';
import { NotFoundPage } from './pages/Pages';
import { useDocumentMeta, useLocation } from './lib/router';
import './index.css';
import './App.css';

function HomePage() {
  useDocumentMeta(
    null,
    'Illini Creative Impact is a UIUC student organization that uses creativity to support local organizations, champion causes, and bring people together. All majors welcome.',
  );
  return (
    <>
      <Hero />
      <HomeBody />
    </>
  );
}

function renderRoute(path: string, search: string) {
  const projectMatch = path.match(/^\/work\/([\w-]+)$/);
  if (projectMatch) return <ProjectPage slug={projectMatch[1]} />;

  switch (path) {
    case '/':
      return <HomePage />;
    case '/work':
      return <WorkPage />;
    case '/events':
      return <EventsPage />;
    // Older URLs (/join, /teams, /faq) point at the new Get Involved page.
    case '/get-involved':
    case '/join':
    case '/teams':
    case '/faq':
      return <GetInvolvedPage search={search} />;
    case '/partner':
    case '/contact':
      return <PartnerPage />;
    case '/community':
    case '/media':
      return <MediaPage />;
    case '/about':
      return <AboutPage />;
    default:
      return <NotFoundPage />;
  }
}

function App() {
  const { path, search } = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <div className="App">
        <Navbar currentPath={path} />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {/* Keyed so each route mounts fresh (resets forms and scroll-reveal animations). */}
          <div key={path + search} className="min-w-0">
            {renderRoute(path, search)}
          </div>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
