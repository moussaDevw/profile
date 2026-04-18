import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import { About, PullQuote } from './components/About';
import Work from './components/Work';
import Expertise from './components/Expertise';
import Experience from './components/Experience';
import CareerLogs from './components/CareerLogs';
import Contact from './components/Contact';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <PullQuote />
        <Work />
        <Expertise />
        <Experience />
        <CareerLogs />
        <Contact />
      </main>
    </>
  );
}

export default App;
