import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black border-t border-purple-500/20 py-12 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo and Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">N</span>
              </div>
              <div>
                <div className="text-white text-xl">Nxzen Hackathon</div>
                <div className="text-gray-400 text-sm">Building the Future of Utilities</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              Challenging students to create innovative, AI-powered solutions for smarter cities and utility systems.
            </p>
          </div>

          {/* Contact and Social */}
          <div className="text-center md:text-right">
            <div className="mb-4">
              <h3 className="text-white mb-2">Contact Us</h3>
              <a 
                href="mailto:contact@nxzen.com" 
                className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2 justify-center md:justify-end"
              >
                <Mail size={16} />
                contact@nxzen.com
              </a>
            </div>

            <div className="flex gap-4 justify-center md:justify-end">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-purple-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center hover:bg-purple-500/30 hover:border-purple-500/50 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className="text-purple-400" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-purple-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center hover:bg-purple-500/30 hover:border-purple-500/50 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github size={20} className="text-purple-400" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-purple-500/20 border border-purple-500/30 rounded-lg flex items-center justify-center hover:bg-purple-500/30 hover:border-purple-500/50 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} className="text-purple-400" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-500/20 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Nxzen Hackathon | Designed for Innovators
          </p>
        </div>
      </div>
    </footer>
  );
}
