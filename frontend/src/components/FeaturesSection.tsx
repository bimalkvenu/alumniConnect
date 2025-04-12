
import React from 'react';
import { MessageCircle, Video, GraduationCap, Calendar } from 'lucide-react';

const features = [
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Real-time Chat",
    description: "Connect instantly with alumni and peers."
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Mentorship",
    description: "Get guidance from experienced alumni."
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Events",
    description: "Join webinars and networking sessions."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 md:px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-muted-foreground">
            Tools and features designed to help you connect and grow.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-medium"
            >
              <div className="w-12 h-12 rounded-lg bg-phthalo/10 flex items-center justify-center mb-4">
                <div className="text-phthalo">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
