
import React from 'react';
import { Button } from '@/components/ui/button';
import { GraduationCap, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 px-4 md:px-6 relative overflow-hidden bg-gradient-to-b from-phthalo-light/50 to-white">
      <div className="container mx-auto text-center max-w-2xl">
        <GraduationCap className="h-12 w-12 text-phthalo mx-auto mb-6" />
        
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Join Our Alumni Network
        </h2>
        
        <p className="text-lg text-muted-foreground mb-8">
          Connect with mentors, attend events, and grow your professional network.
          Access your personalized alumni profile and dashboard.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Button 
            size="lg" 
            className="button-transition button-hover"
            asChild
          >
            <Link to="/alumni-portal">Alumni Portal</Link>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="button-transition button-hover flex gap-2"
            asChild
          >
            <Link to="/ai-chat">
              <MessageCircle className="h-5 w-5" />
              Chat with AI Assistant
            </Link>
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-3 gap-6">
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-phthalo mb-1">5K+</div>
            <p className="text-sm text-muted-foreground">Alumni</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-phthalo mb-1">500+</div>
            <p className="text-sm text-muted-foreground">Mentors</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-phthalo mb-1">250+</div>
            <p className="text-sm text-muted-foreground">Events</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
