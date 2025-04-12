
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Video } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center pt-20 pb-16 px-4 md:px-6">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-phthalo-light to-white -z-10"></div>
      
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 max-w-xl">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Connect with Alumni, <span className="text-gradient">Shape Your Future</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Join our community of students and alumni to build meaningful connections, 
              get mentorship, and accelerate your career growth.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="button-transition button-hover"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="button-transition button-hover"
            >
              <Video className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8 shadow-medium">
          <div className="aspect-video relative overflow-hidden rounded-xl bg-gradient-to-br from-phthalo to-phthalo-medium flex items-center justify-center">
            <div className="text-white text-center p-8">
              <h3 className="text-2xl font-semibold mb-4">Join Our Network</h3>
              <p className="text-white/90">Connect with 5,000+ alumni worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
