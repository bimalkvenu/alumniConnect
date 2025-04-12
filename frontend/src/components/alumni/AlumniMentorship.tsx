import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Calendar, Users, MessageCircle, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

const mentors = [
  {
    name: "Jennifer Chen",
    role: "Product Manager at Microsoft",
    specialties: ["Career Guidance", "Tech Leadership", "Product Strategy"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4.9,
    reviews: 28
  },
  {
    name: "Michael Roberts",
    role: "Senior Software Engineer at Amazon",
    specialties: ["Software Development", "System Design", "Interview Prep"],
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4.7,
    reviews: 19
  },
  {
    name: "Sophia Williams",
    role: "Marketing Director at Google",
    specialties: ["Digital Marketing", "Brand Strategy", "Leadership"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4.8,
    reviews: 32
  },
  {
    name: "James Wilson",
    role: "Data Scientist at Netflix",
    specialties: ["Machine Learning", "Data Analysis", "AI Ethics"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4.6,
    reviews: 15
  }
];

const AlumniMentorship = () => {
  return (
    <div className="space-y-6">
      {/* Mentorship Progress Card */}
      <Card className="p-6 glass-card">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-grow">
            <h3 className="text-lg font-semibold mb-2">Your Mentorship Journey</h3>
            <p className="text-sm text-muted-foreground mb-4">Track your progress and mentorship goals</p>
            
            <div className="grid gap-4 mb-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Sessions Completed</span>
                  <span className="text-sm font-medium">4/10</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Goals Achieved</span>
                  <span className="text-sm font-medium">2/5</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Find Students Section */}
      <div className="w-full">
        {/* Search and Filter Bar */}
        <Card className="p-4 glass-card mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search students by name, interests, or goals..." 
                className="pl-9 w-full"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>
          </div>
        </Card>
        
        <div className="grid md:grid-cols-2 gap-6">
          {mentors.map((mentor, index) => (
            <Card 
              key={index} 
              className="overflow-hidden glass-card transition-all duration-300 hover:shadow-medium hover:-translate-y-1 flex flex-col md:flex-row"
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
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xl font-semibold">{mentor.name}</h3>
                    <div className="flex items-center text-sm">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{mentor.rating}</span>
                      <span className="text-muted-foreground ml-1">({mentor.reviews})</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-3">{mentor.role}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentor.specialties.map((specialty, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="flex items-center justify-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>Message</span>
                  </Button>
                  <Button className="flex items-center justify-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Book Session</span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlumniMentorship;