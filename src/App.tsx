// App.tsx
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { RoundsOverview } from './components/RoundsOverview';
import { ChallengeTracks } from './components/ChallengeTracks';
import { JudgingCriteria } from './components/JudgingCriteria';
import RegistrationForm from './components/RegistrationForm';
import { Timeline } from './components/Timeline';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/Admin';
import { Toaster } from './components/ui/sonner';
import { Button } from './components/ui/button';
import { Shield } from 'lucide-react';

// Home Page Component
function HomePage() {
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

// Main App Component with Router
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Registration Page */}
        <Route path="/" element={<HomePage />} />
        
        {/* Admin Panel Page */}
        <Route path="/admin" element={
          <>
            <AdminPanel />
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
          </>
        } />
      </Routes>
    </Router>
  );
}