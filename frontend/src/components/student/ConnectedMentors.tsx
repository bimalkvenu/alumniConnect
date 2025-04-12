
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MessageCircle, Calendar, Star } from 'lucide-react';

const ConnectedMentors = () => {
  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Senior Software Engineer at Google",
      expertise: ["Machine Learning", "Algorithms", "System Design"],
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3",
      availability: "Available this week",
      lastSession: "March 28, 2025"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Data Scientist at Amazon",
      expertise: ["Data Analysis", "Python", "Statistics"],
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3",
      availability: "Next available: April 10",
      lastSession: "February 15, 2025"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Designer at Apple",
      expertise: ["User Experience", "Interface Design", "Prototyping"],
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3",
      availability: "Available this week",
      lastSession: "March 20, 2025"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="glass-card p-6 rounded-xl animate-fade-in">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Your Connected Mentors
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pt-2 pb-0">
          <div className="space-y-4">
            {mentors.map(mentor => (
              <div 
                key={mentor.id} 
                className="border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300 animate-fade-in glass-card hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 h-48 md:h-auto overflow-hidden">
                    <img 
                      src={mentor.image} 
                      alt={mentor.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-4 md:w-3/4 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{mentor.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{mentor.role}</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{mentor.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {mentor.expertise.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{mentor.availability}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>Last session: {mentor.lastSession}</span>
                      </div>
                    </div>
                    
                    <div className="mt-auto flex gap-2">
                      <Button size="sm" className="button-transition button-hover focus-ring">
                        <Calendar className="h-4 w-4 mr-1" />
                        Schedule Session
                      </Button>
                      <Button size="sm" variant="outline" className="button-transition button-hover focus-ring">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConnectedMentors;
