
import React from 'react';
import { Button } from '@/components/ui/button';
import { GraduationCap, Calendar, MessageCircle, Users } from 'lucide-react';

const mentors = [
  {
    name: "Jennifer Chen",
    role: "Product Manager at Microsoft",
    specialties: ["Career Guidance", "Tech Leadership", "Product Strategy"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "Michael Roberts",
    role: "Senior Software Engineer at Amazon",
    specialties: ["Software Development", "System Design", "Interview Prep"],
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    name: "Sophia Williams",
    role: "Marketing Director at Google",
    specialties: ["Digital Marketing", "Brand Strategy", "Leadership"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

const MentorshipSection = () => {
  return (
    <section id="mentorship" className="py-24 px-4 md:px-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-phthalo-light/50 to-white/50 -z-10"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-phthalo-light rounded-full opacity-10 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-phthalo-light rounded-full opacity-10 blur-3xl -z-10"></div>
      
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 max-w-xl animate-on-scroll">
            <div className="inline-block px-3 py-1 text-sm font-medium bg-phthalo-light text-phthalo-dark rounded-full">
              Expert Guidance
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Connect with Alumni Mentors for Career Growth
            </h2>
            <p className="text-lg text-muted-foreground">
              Our mentorship program pairs you with experienced alumni who can provide personalized guidance, 
              industry insights, and valuable feedback to help you achieve your career goals.
            </p>
            
            <ul className="space-y-4">
              {[
                { icon: <GraduationCap className="h-5 w-5" />, text: "Learn from industry experts" },
                { icon: <Calendar className="h-5 w-5" />, text: "Schedule one-on-one mentorship sessions" },
                { icon: <MessageCircle className="h-5 w-5" />, text: "Get personalized career advice" },
                { icon: <Users className="h-5 w-5" />, text: "Build a professional network" }
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-3 mt-0.5 text-phthalo">{item.icon}</div>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            
            <div className="pt-4">
              <Button 
                size="lg" 
                className="button-transition button-hover focus-ring"
              >
                Find a Mentor
              </Button>
            </div>
          </div>
          
          <div className="relative animate-on-scroll">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-phthalo-light rounded-full opacity-70 -z-10"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-phthalo-light rounded-full opacity-70 -z-10"></div>
            
            <div className="grid gap-6">
              {mentors.map((mentor, index) => (
                <div 
                  key={index} 
                  className="glass-card rounded-xl overflow-hidden shadow-soft transition-all duration-300 hover:shadow-medium flex flex-col md:flex-row animate-on-scroll"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                    <img 
                      src={mentor.image} 
                      alt={mentor.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{mentor.name}</h3>
                      <p className="text-muted-foreground mb-3">{mentor.role}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {mentor.specialties.map((specialty, idx) => (
                          <span 
                            key={idx} 
                            className="px-3 py-1 bg-phthalo-light text-phthalo-dark text-sm rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="mt-2 w-full md:w-auto justify-center md:justify-start button-transition button-hover focus-ring"
                    >
                      Request Mentorship
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorshipSection;
