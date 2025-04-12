import React, { useEffect } from 'react';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import { Calendar, Users, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const events = [
  {
    title: "Tech Industry Panel Discussion",
    description: "Join alumni leaders from major tech companies as they discuss current trends and career opportunities.",
    date: "June 15, 2023",
    time: "6:00 PM - 8:00 PM",
    location: "Virtual Event",
    attendees: 124,
    type: "Webinar",
    image: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    title: "Summer Networking Mixer",
    description: "Connect with fellow alumni and current students in a casual setting with refreshments and activities.",
    date: "July 8, 2023",
    time: "7:00 PM - 10:00 PM",
    location: "Grand Hotel Rooftop",
    attendees: 85,
    type: "In-Person",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    title: "Career Development Workshop",
    description: "Enhance your professional skills with this hands-on workshop led by career experts and successful alumni.",
    date: "July 22, 2023",
    time: "10:00 AM - 2:00 PM",
    location: "Main Campus, Building C",
    attendees: 56,
    type: "Hybrid",
    image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

const Events = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-phthalo-light/50 to-white">
      <NavigationBar />
      
      <main className="flex-grow py-24 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 text-sm font-medium bg-phthalo-light text-phthalo-dark rounded-full mb-4">
              Campus Happenings
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-phthalo">
              Upcoming Campus Events
            </h1>
            <p className="text-lg text-muted-foreground">
              Stay updated with all the upcoming events, activities, and networking opportunities at your campus.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {events.map((event, index) => (
              <div 
                key={index}
                className="glass-card rounded-xl overflow-hidden shadow-soft transition-all duration-300 hover:shadow-medium flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 text-xs font-medium bg-white/90 backdrop-blur-xs rounded-full text-phthalo">
                    {event.type}
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>
                  
                  <div className="mt-auto space-y-3 pt-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-phthalo mr-2 flex-shrink-0" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-phthalo mr-2 flex-shrink-0" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-phthalo mr-2 flex-shrink-0" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-phthalo mr-2 flex-shrink-0" />
                      <span className="text-sm">{event.attendees} attending</span>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 pb-6">
                  <Button 
                    className="w-full justify-center button-transition button-hover focus-ring"
                  >
                    RSVP Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              className="button-transition button-hover focus-ring"
            >
              View All Events
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;