import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { RoundsOverview } from './components/RoundsOverview';
import { ChallengeTracks } from './components/ChallengeTracks';
import { JudgingCriteria } from './components/JudgingCriteria';
import { RegistrationForm } from './components/RegistrationForm';
import { Timeline } from './components/Timeline';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const scrollToRegister = () => {
    const element = document.getElementById('register');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero onRegisterClick={scrollToRegister} />
      <About />
      <RoundsOverview />
      <ChallengeTracks />
      <JudgingCriteria />
      <RegistrationForm />
      <Timeline />
      <Footer />
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: 'rgba(17, 24, 39, 0.95)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            color: 'white',
          },
        }}
      />
    </div>
  );
}
