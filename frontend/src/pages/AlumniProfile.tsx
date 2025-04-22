import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Briefcase, 
  GraduationCap, 
  Calendar,
  Mail,
  Edit,
  Phone,
  MapPin,
  Award,
  Globe,
  BookOpen,
  Linkedin,
  Users as UsersIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface AlumniData {
  name: string;
  email: string;
  phone: string;
  location: string;
  graduationYear: string;
  degree: string;
  company: string;
  role: string;
  linkedin?: string;
  website?: string;
  skills: string[];
  achievements: string[];
  education: { 
    institution: string; 
    degree: string; 
    year: string;
    description: string;  
  }[];
  experience: { company: string; role: string; duration: string }[];
  mentees: { name: string; field: string }[];
  events: { title: string; date: string }[];
  about?: string;
}

const AlumniProfile = () => {
  const [alumniData, setAlumniData] = useState<AlumniData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios.get("/api/alumni/profile")
      .then(res => setAlumniData(res.data))
      .catch(err => console.error("Error fetching alumni data", err))
      .finally(() => setLoading(false));
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 relative">
            <div className="h-48 rounded-xl overflow-hidden mb-16">
              <img 
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop" 
                alt="Profile Banner" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Avatar & Intro */}
            <div className="absolute left-8 bottom-0 transform translate-y-1/2 flex flex-col sm:flex-row items-start sm:items-end gap-6">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt={alumniData?.name || "Alumni Photo"} 
                  className="w-24 h-24 rounded-full border-4 border-white object-cover"
                />
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="absolute bottom-0 right-0 rounded-full bg-white h-8 w-8"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <div className="sm:mb-4">
                <h1 className="text-2xl md:text-3xl font-bold">
                  {alumniData?.name || "Loading..."}
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                  {alumniData?.degree && alumniData?.graduationYear && (
                    <>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4" />
                        {alumniData.degree}, Class of {alumniData.graduationYear}
                      </span>
                      <span className="hidden sm:inline">•</span>
                    </>
                  )}
                  {alumniData?.company && alumniData?.role && (
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {alumniData.role} at {alumniData.company}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                asChild
              >
                <Link to="/alumni-portal">
                  <GraduationCap className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Information */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{alumniData?.email || "—"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{alumniData?.phone || "—"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{alumniData?.location || "—"}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t">
                  <h4 className="text-sm font-semibold mb-3">Social Media</h4>
                  <div className="flex gap-2">
                    {alumniData?.linkedin && (
                      <a href={alumniData.linkedin} target="_blank" rel="noopener noreferrer">
                        <Button size="icon" variant="outline">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                    {alumniData?.website && (
                      <a href={alumniData.website} target="_blank" rel="noopener noreferrer">
                        <Button size="icon" variant="outline">
                          <Globe className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </Card>

              {/* Skills & Expertise */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {alumniData?.skills?.length ? (
                    alumniData.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary">{skill}</Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No skills added</p>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="mt-4 w-full">
                  <Edit className="h-3 w-3 mr-2" />
                  Edit Skills
                </Button>
              </Card>

              {/* Achievements */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Achievements
                </h3>
                <div className="space-y-4">
                  {alumniData?.achievements?.length ? (
                    alumniData.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Award className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium">{achievement}</p>
                          <p className="text-sm text-muted-foreground">Recognized Achievement</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No achievements listed</p>
                  )}
                </div>
              </Card>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">About Me</h3>
                <p className="text-muted-foreground">{alumniData?.about || "No description added yet."}</p>
              </Card>
              
              <Tabs defaultValue="education" className="w-full">
                <TabsList className="w-full mb-6 grid grid-cols-2 h-auto bg-muted/50 p-1 rounded-lg">
                  <TabsTrigger value="education" className="py-2 data-[state=active]:bg-white flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span>Education</span>
                  </TabsTrigger>
                  <TabsTrigger value="experience" className="py-2 data-[state=active]:bg-white flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>Experience</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="education" className="mt-0 space-y-4">
                  {loading ? (
                    <p>Loading education...</p>
                  ) : alumniData?.education?.length ? (
                    alumniData.education.map((edu, idx) => (
                      <div key={idx} className="border-l-2 border-primary/30 pl-4 ml-2 relative">
                        <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                        <div className="mb-1">
                          <h4 className="text-base font-semibold">{edu.degree}</h4>
                          <p className="text-muted-foreground">{edu.institution}</p>
                          <p className="text-sm text-muted-foreground">{edu.year}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No education information available</p>
                  )}
                </TabsContent>

                <TabsContent value="experience" className="mt-0 space-y-4">
                  {loading ? (
                    <p>Loading experience...</p>
                  ) : alumniData?.experience?.length ? (
                    alumniData.experience.map((exp, idx) => (
                      <div key={idx} className="border-l-2 border-primary/30 pl-4 ml-2 relative">
                        <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                        <div className="mb-1">
                          <h4 className="text-base font-semibold">{exp.role}</h4>
                          <p className="text-muted-foreground">{exp.company}</p>
                          <p className="text-sm text-muted-foreground">{exp.duration}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No experience information available</p>
                  )}
                </TabsContent>
              </Tabs>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Mentorship & Activities</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Current Mentees</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Program</TableHead>
                          <TableHead>Since</TableHead>
                          <TableHead className="text-right">Next Session</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loading ? (
                          <TableRow><TableCell colSpan={4}>Loading mentees...</TableCell></TableRow>
                        ) : alumniData?.mentees?.length ? (
                          alumniData.mentees.map((mentee, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">{mentee.name}</TableCell>
                              <TableCell>{mentee.field}</TableCell>
                              <TableCell>—</TableCell>
                              <TableCell className="text-right">—</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow><TableCell colSpan={4}>No mentees currently</TableCell></TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="pt-4">
                    <h4 className="font-medium mb-2">Recent Events</h4>
                    <div className="space-y-3">
                      {loading ? (
                        <p>Loading events...</p>
                      ) : alumniData?.events?.length ? (
                        alumniData.events.map((event, idx) => (
                          <div key={idx} className={`flex items-center gap-3 ${idx !== alumniData.events.length - 1 ? "pb-3 border-b" : ""}`}>
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">{event.title}</p>
                              <p className="text-sm text-muted-foreground">{event.date}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground">No recent events</p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Complete Your Profile</h3>
                    <p className="text-sm text-muted-foreground">Enhance your visibility to other alumni and potential employers.</p>
                  </div>
                  <Button variant="outline" className="whitespace-nowrap flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Update Profile
                  </Button>
                </div>
                <Progress value={85} className="h-2 mb-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>85% Complete</span>
                  <span>2 items remaining</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span>Contact Info</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span>Education</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span>Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span>Skills</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">!</span>
                    </div>
                    <span className="text-muted-foreground">Portfolio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">!</span>
                    </div>
                    <span className="text-muted-foreground">Recommendations</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AlumniProfile;