
import React from 'react';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-200 pt-16 pb-8 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="font-semibold text-xl text-white">AlumniConnect</span>
            </div>
            <p className="text-slate-400 mb-6">
              Connecting alumni and students for mentorship, networking, and professional growth.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#features" className="text-slate-400 hover:text-primary transition-colors">Features</a></li>
              <li><a href="#mentorship" className="text-slate-400 hover:text-primary transition-colors">Mentorship</a></li>
              <li><a href="#ai-assistant" className="text-slate-400 hover:text-primary transition-colors">AI Assistant</a></li>
              <li><a href="#events" className="text-slate-400 hover:text-primary transition-colors">Events</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors">About Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400">contact@alumniconnect.edu</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400">+91 9656430228</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400">
                  Lovely Professional University<br />
                  Jalandhar, Punjab<br />
                  India, 144402
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} AlumniConnect. All rights reserved.</p>
          <p className="mt-2">
            Powered by Microsoft Azure for secure, scalable, and high-performance cloud services.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
