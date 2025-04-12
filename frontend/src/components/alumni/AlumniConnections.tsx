
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, UserPlus } from 'lucide-react';

const connections = [
  {
    name: "Emily Johnson",
    role: "Marketing Manager at Apple",
    graduationYear: "2021",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    mutual: 8
  },
  {
    name: "David Chen",
    role: "Software Engineer at Google",
    graduationYear: "2020",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    mutual: 15
  },
  {
    name: "Michael Thompson",
    role: "Data Scientist at Microsoft",
    graduationYear: "2019",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    mutual: 6
  },
  {
    name: "Jessica Williams",
    role: "UX Designer at Adobe",
    graduationYear: "2022",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    mutual: 3
  },
  {
    name: "Robert Garcia",
    role: "Product Manager at Amazon",
    graduationYear: "2018",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    mutual: 10
  },
  {
    name: "Sara Miller",
    role: "Finance Analyst at JPMorgan",
    graduationYear: "2021",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3",
    mutual: 4
  }
];

const AlumniConnections = () => {
  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <Card className="p-4 glass-card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search connections..." 
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

      {/* Stats Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Connections", value: "43" },
          { label: "Pending Requests", value: "5" },
          { label: "New This Month", value: "12" },
          { label: "Messages Exchanged", value: "89" }
        ].map((stat, index) => (
          <Card key={index} className="p-4 text-center glass-card">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Connections Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((connection, index) => (
          <Card key={index} className="overflow-hidden glass-card transition-all duration-300 hover:shadow-medium hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={connection.image} 
                  alt={connection.name} 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{connection.name}</h3>
                  <p className="text-sm text-muted-foreground">{connection.role}</p>
                  <p className="text-xs text-muted-foreground">Class of {connection.graduationYear}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                  {connection.mutual} mutual connections
                </span>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 text-sm h-9">Message</Button>
                <Button className="flex-1 text-sm h-9">View Profile</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default AlumniConnections;
