
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, Users, Star, Plus } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const MentorSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Senior Software Engineer at Google",
      expertise: ["Machine Learning", "Algorithms", "System Design"],
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3",
      industry: "Technology"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Data Scientist at Amazon",
      expertise: ["Data Analysis", "Python", "Statistics"],
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3",
      industry: "Technology"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Designer at Apple",
      expertise: ["User Experience", "Interface Design", "Prototyping"],
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3",
      industry: "Technology"
    },
    {
      id: 4,
      name: "David Park",
      role: "Product Manager at Microsoft",
      expertise: ["Product Strategy", "Market Analysis", "Agile"],
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3",
      industry: "Technology"
    },
    {
      id: 5,
      name: "Jessica Wilson",
      role: "Financial Analyst at JP Morgan",
      expertise: ["Financial Modeling", "Investment Analysis", "Banking"],
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3",
      industry: "Finance"
    },
    {
      id: 6,
      name: "Robert Kim",
      role: "Marketing Director at Procter & Gamble",
      expertise: ["Brand Management", "Digital Marketing", "Consumer Research"],
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3",
      industry: "Marketing"
    }
  ];
  
  const filteredMentors = mentors.filter(mentor => 
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
    mentor.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const industries = [...new Set(mentors.map(mentor => mentor.industry))];
  
  const skills = [...new Set(mentors.flatMap(mentor => mentor.expertise))];

  return (
    <div className="space-y-6">
      <Card className="glass-card p-6 rounded-xl animate-fade-in">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Find Mentors
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pt-2 pb-0">
          {/* Search and filters */}
          <div className="mb-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, role, expertise..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <div className="flex items-center justify-between">
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm" className="mb-4">
                    <Filter className="h-4 w-4 mr-2" />
                    {isFiltersOpen ? "Hide Filters" : "Show Filters"}
                  </Button>
                </CollapsibleTrigger>
                <span className="text-sm text-muted-foreground">
                  Showing {filteredMentors.length} mentors
                </span>
              </div>
              
              <CollapsibleContent className="mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-medium mb-2">Industry</h4>
                    <div className="flex flex-wrap gap-2">
                      {industries.map(industry => (
                        <Badge 
                          key={industry} 
                          variant="outline" 
                          className="cursor-pointer hover:bg-primary/10"
                          onClick={() => setSearchTerm(industry)}
                        >
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.slice(0, 8).map(skill => (
                        <Badge 
                          key={skill} 
                          variant="outline"
                          className="cursor-pointer hover:bg-primary/10"
                          onClick={() => setSearchTerm(skill)}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          {/* Mentors grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMentors.map(mentor => (
              <div 
                key={mentor.id}
                className="border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300 animate-fade-in glass-card hover:shadow-md"
              >
                <div className="flex p-4">
                  <div className="w-16 h-16 mr-4 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{mentor.name}</h3>
                        <p className="text-sm text-muted-foreground">{mentor.role}</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{mentor.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {mentor.expertise.slice(0, 2).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-slate-100">
                          {skill}
                        </Badge>
                      ))}
                      {mentor.expertise.length > 2 && (
                        <Badge variant="secondary" className="text-xs bg-slate-100">
                          +{mentor.expertise.length - 2} more
                        </Badge>
                      )}
                    </div>
                    
                    <Button size="sm" variant="outline" className="mt-2 h-7 text-xs w-full">
                      <Plus className="h-3 w-3 mr-1" />
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredMentors.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No mentors found matching your search criteria.</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => setSearchTerm('')}
              >
                Clear search
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MentorSearch;
