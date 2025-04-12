
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EventNoticeBoard = () => {
  const events = [
    {
      id: 1,
      title: "Career Fair: Tech Companies",
      date: "April 15, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Main Campus, Building A",
      description: "Meet recruiters from top tech companies and explore internship and job opportunities.",
      attendees: 120
    },
    {
      id: 2,
      title: "Workshop: Machine Learning Basics",
      date: "April 18, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Computer Science Building, Room 302",
      description: "Learn the fundamentals of machine learning algorithms and their applications.",
      attendees: 45
    },
    {
      id: 3,
      title: "Guest Lecture: Cybersecurity Trends",
      date: "April 22, 2025",
      time: "3:30 PM - 5:00 PM",
      location: "Virtual Event (Zoom)",
      description: "Join industry expert Sarah Chen as she discusses the latest trends in cybersecurity.",
      attendees: 89
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="glass-card p-6 rounded-xl animate-fade-in bg-gradient-to-br from-white via-phthalo-light/30 to-white">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-phthalo" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pt-2 pb-0">
          <div className="space-y-4">
            {events.map(event => (
              <div 
                key={event.id} 
                className="border rounded-lg p-4 hover:border-phthalo/30 transition-colors cursor-pointer animate-fade-in bg-gradient-to-br from-white to-phthalo-light/30 shadow-soft"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-phthalo-dark">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-phthalo" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-phthalo" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-phthalo" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-phthalo" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="button-transition button-hover focus-ring bg-phthalo hover:bg-phthalo-dark">
                    RSVP
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventNoticeBoard;
