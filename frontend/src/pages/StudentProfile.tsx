import React, { useEffect } from 'react';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  BookOpen, 
  GraduationCap, 
  Award, 
  Edit, 
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  LinkedinIcon,
  Users as UsersIcon,
  Clock,
  Bookmark,
  BarChart2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const StudentProfile = () => {
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 relative">
            <div className="h-48 rounded-xl overflow-hidden mb-16">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" 
                alt="Profile Banner" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute left-8 bottom-0 transform translate-y-1/2 flex flex-col sm:flex-row items-start sm:items-end gap-6">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Alex Rivera" 
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
                <h1 className="text-2xl md:text-3xl font-bold">{user?.name}</h1>
                <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    {user?.program}, Year {user?.year}
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    GPA: 3.78
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                asChild
              >
                <Link to="/student-portal">
                  <BookOpen className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button 
                className="flex items-center gap-2 button-transition button-hover"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <Card className="p-6 glass-card">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">alex.rivera@university.edu</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">(555) 987-6543</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Campus Address</p>
                      <p className="font-medium">Dormitory B, Room 214</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <h4 className="text-sm font-semibold mb-3">Social Media</h4>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline">
                      <LinkedinIcon className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Globe className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 glass-card">
                <h3 className="text-lg font-semibold mb-4">Academic Interests</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Artificial Intelligence</Badge>
                  <Badge variant="secondary">Web Development</Badge>
                  <Badge variant="secondary">Data Science</Badge>
                  <Badge variant="secondary">Cybersecurity</Badge>
                  <Badge variant="secondary">UX/UI Design</Badge>
                  <Badge variant="secondary">Mobile Development</Badge>
                </div>
                <Button variant="ghost" size="sm" className="mt-4 w-full">
                  <Edit className="h-3 w-3 mr-2" />
                  Edit Interests
                </Button>
              </Card>
              
              <Card className="p-6 glass-card">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Achievements
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">Dean's List</p>
                      <p className="text-sm text-muted-foreground">Fall 2022, Spring 2023</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium">Research Assistant</p>
                      <p className="text-sm text-muted-foreground">Machine Learning Lab</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <UsersIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">CS Club President</p>
                      <p className="text-sm text-muted-foreground">2022-2023</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 glass-card">
                <h3 className="text-lg font-semibold mb-4">About Me</h3>
                <p className="text-muted-foreground">
                  Passionate Computer Science student with a focus on artificial intelligence and web development. 
                  Currently in my third year, I'm actively involved in research projects and student organizations. 
                  I enjoy building applications that solve real-world problems and mentoring first-year students.
                </p>
                <p className="text-muted-foreground mt-3">
                  Through the mentorship program, I'm looking to connect with alumni who can provide guidance 
                  on career paths, internship opportunities, and graduate school applications.
                </p>
              </Card>
              
              <Tabs defaultValue="courses" className="w-full">
                <TabsList className="w-full mb-6 grid grid-cols-2 h-auto bg-muted/50 p-1 rounded-lg">
                  <TabsTrigger value="courses" className="py-2 data-[state=active]:bg-white flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Current Courses</span>
                  </TabsTrigger>
                  <TabsTrigger value="activities" className="py-2 data-[state=active]:bg-white flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Activities</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="courses" className="mt-0 space-y-4">
                  <div className="border-l-2 border-primary/30 pl-4 ml-2 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                    <div className="mb-1">
                      <h4 className="text-base font-semibold">CS 410 - Machine Learning</h4>
                      <p className="text-muted-foreground">Prof. Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">Mon/Wed 10:00-11:30</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">A-</Badge>
                      <Progress value={85} className="h-2 w-32" />
                    </div>
                  </div>
                  
                  <div className="border-l-2 border-primary/30 pl-4 ml-2 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                    <div className="mb-1">
                      <h4 className="text-base font-semibold">CS 360 - Web Development</h4>
                      <p className="text-muted-foreground">Prof. Michael Chen</p>
                      <p className="text-sm text-muted-foreground">Tue/Thu 1:00-2:30</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">A</Badge>
                      <Progress value={92} className="h-2 w-32" />
                    </div>
                  </div>
                  
                  <div className="border-l-2 border-primary/30 pl-4 ml-2 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                    <div className="mb-1">
                      <h4 className="text-base font-semibold">CS 320 - Algorithms</h4>
                      <p className="text-muted-foreground">Prof. David Wilson</p>
                      <p className="text-sm text-muted-foreground">Mon/Wed/Fri 9:00-10:00</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">B+</Badge>
                      <Progress value={78} className="h-2 w-32" />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="activities" className="mt-0 space-y-4">
                  <div className="border-l-2 border-primary/30 pl-4 ml-2 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                    <div className="mb-1">
                      <h4 className="text-base font-semibold">Computer Science Club</h4>
                      <p className="text-muted-foreground">President</p>
                      <p className="text-sm text-muted-foreground">2022 - Present</p>
                    </div>
                    <p className="text-sm mt-2">
                      Organize weekly meetings, hackathons, and guest speaker events. 
                      Lead a team of 10 officers in planning activities for 200+ members.
                    </p>
                  </div>
                  
                  <div className="border-l-2 border-primary/30 pl-4 ml-2 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                    <div className="mb-1">
                      <h4 className="text-base font-semibold">Undergraduate Research</h4>
                      <p className="text-muted-foreground">Machine Learning Lab</p>
                      <p className="text-sm text-muted-foreground">Jan 2023 - Present</p>
                    </div>
                    <p className="text-sm mt-2">
                      Assist PhD candidates with research on neural network optimization. 
                      Implement algorithms in Python and analyze performance metrics.
                    </p>
                  </div>
                  
                  <div className="border-l-2 border-primary/30 pl-4 ml-2 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                    <div className="mb-1">
                      <h4 className="text-base font-semibold">Student Mentor</h4>
                      <p className="text-muted-foreground">First-Year Program</p>
                      <p className="text-sm text-muted-foreground">Aug 2022 - Present</p>
                    </div>
                    <p className="text-sm mt-2">
                      Guide incoming CS students through their transition to university. 
                      Provide academic advice and organize study sessions.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
              
              <Card className="p-6 glass-card">
                <h3 className="text-lg font-semibold mb-4">Mentorship Program</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Current Mentors</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead>Since</TableHead>
                          <TableHead className="text-right">Next Meeting</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Sarah Johnson</TableCell>
                          <TableCell>Software Engineer, Google</TableCell>
                          <TableCell>Jan 2023</TableCell>
                          <TableCell className="text-right">June 15, 2023</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Michael Chen</TableCell>
                          <TableCell>UX Lead, Microsoft</TableCell>
                          <TableCell>Mar 2023</TableCell>
                          <TableCell className="text-right">June 18, 2023</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="pt-4">
                    <h4 className="font-medium mb-2">Upcoming Events</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 pb-3 border-b">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">Tech Career Panel</p>
                          <p className="text-sm text-muted-foreground">June 10, 2023 • 4:00 PM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Bookmark className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Resume Workshop</p>
                          <p className="text-sm text-muted-foreground">June 15, 2023 • 2:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 glass-card">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Profile Completion</h3>
                    <p className="text-sm text-muted-foreground">Complete your profile to get better mentor matches.</p>
                  </div>
                  <Button variant="outline" className="whitespace-nowrap flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Update Profile
                  </Button>
                </div>
                <Progress value={75} className="h-2 mb-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>75% Complete</span>
                  <span>3 items remaining</span>
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
                    <span>Academic Info</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span>Interests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">!</span>
                    </div>
                    <span className="text-muted-foreground">Career Goals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">!</span>
                    </div>
                    <span className="text-muted-foreground">Skills</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">!</span>
                    </div>
                    <span className="text-muted-foreground">Projects</span>
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

export default StudentProfile;