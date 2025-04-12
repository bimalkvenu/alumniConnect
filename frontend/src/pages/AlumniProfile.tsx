import React, { useEffect } from 'react';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Edit, 
  Settings, 
  BookOpen,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  LinkedinIcon,
  Users as UsersIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AlumniProfile = () => {
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
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop" 
                alt="Profile Banner" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute left-8 bottom-0 transform translate-y-1/2 flex flex-col sm:flex-row items-start sm:items-end gap-6">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Sarah Johnson" 
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
                <h1 className="text-2xl md:text-3xl font-bold">Sarah Johnson</h1>
                <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    Computer Science, Class of 2022
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    Software Engineer at Google
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
                <Link to="/alumni-portal">
                  <GraduationCap className="h-4 w-4" />
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
                      <p className="font-medium">sarah.johnson@example.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">(555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">San Francisco, CA</p>
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
                <h3 className="text-lg font-semibold mb-4">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">JavaScript</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">UX Design</Badge>
                  <Badge variant="secondary">Cloud Computing</Badge>
                  <Badge variant="secondary">Project Management</Badge>
                </div>
                <Button variant="ghost" size="sm" className="mt-4 w-full">
                  <Edit className="h-3 w-3 mr-2" />
                  Edit Skills
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
                      <p className="font-medium">Mentor of the Year</p>
                      <p className="text-sm text-muted-foreground">Awarded in 2023</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium">5 Courses Completed</p>
                      <p className="text-sm text-muted-foreground">Since joining</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <UsersIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Active Member</p>
                      <p className="text-sm text-muted-foreground">2+ years</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 glass-card">
                <h3 className="text-lg font-semibold mb-4">About Me</h3>
                <p className="text-muted-foreground">
                  Computer Science graduate with a passion for building accessible and user-friendly web applications. 
                  Currently working as a Software Engineer at Google, focusing on front-end development with React and TypeScript. 
                  I enjoy mentoring junior developers and contributing to open-source projects in my free time.
                </p>
                <p className="text-muted-foreground mt-3">
                  As an alumna, I'm excited to connect with fellow graduates and current students, 
                  share my industry experience, and participate in the community's growth.
                </p>
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
                  <div className="border-l-2 border-primary/30 pl-4 ml-2 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                    <div className="mb-1">
                      <h4 className="text-base font-semibold">M.S. Computer Science</h4>
                      <p className="text-muted-foreground">Stanford University</p>
                      <p className="text-sm text-muted-foreground">2020 - 2022</p>
                    </div>
                    <p className="text-sm mt-2">
                      Specialized in Human-Computer Interaction and Machine Learning. 
                      Thesis on "Improving Accessibility in Web Applications through AI".
                    </p>
                  </div>
                  
                  <div className="border-l-2 border-primary/30 pl-4 ml-2 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                    <div className="mb-1">
                      <h4 className="text-base font-semibold">B.S. Computer Science</h4>
                      <p className="text-muted-foreground">University of California, Berkeley</p>
                      <p className="text-sm text-muted-foreground">2016 - 2020</p>
                    </div>
                    <p className="text-sm mt-2">
                      Minor in Business Administration. Graduated with Honors. 
                      Active member of Women in Technology student organization.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="experience" className="mt-0 space-y-4">
                  <div className="border-l-2 border-primary/30 pl-4 ml-2 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                    <div className="mb-1">
                      <h4 className="text-base font-semibold">Software Engineer</h4>
                      <p className="text-muted-foreground">Google</p>
                      <p className="text-sm text-muted-foreground">2022 - Present</p>
                    </div>
                    <p className="text-sm mt-2">
                      Working on Google Cloud Platform user interfaces. 
                      Building responsive web applications using React, TypeScript, and Material Design components.
                      Leading accessibility initiatives on the team.
                    </p>
                  </div>
                  
                  <div className="border-l-2 border-primary/30 pl-4 ml-2 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                    <div className="mb-1">
                      <h4 className="text-base font-semibold">Software Engineering Intern</h4>
                      <p className="text-muted-foreground">Microsoft</p>
                      <p className="text-sm text-muted-foreground">Summer 2021</p>
                    </div>
                    <p className="text-sm mt-2">
                      Developed features for Microsoft Teams using React and Azure services.
                      Implemented real-time collaboration tools that improved team productivity.
                    </p>
                  </div>
                  
                  <div className="border-l-2 border-primary/30 pl-4 ml-2 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                    <div className="mb-1">
                      <h4 className="text-base font-semibold">Research Assistant</h4>
                      <p className="text-muted-foreground">UC Berkeley EECS Department</p>
                      <p className="text-sm text-muted-foreground">2019 - 2020</p>
                    </div>
                    <p className="text-sm mt-2">
                      Assisted with research on human-computer interaction. 
                      Developed prototypes for testing user experiences and collecting data.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
              
              <Card className="p-6 glass-card">
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
                        <TableRow>
                          <TableCell className="font-medium">Alex Rivera</TableCell>
                          <TableCell>Computer Science</TableCell>
                          <TableCell>Jan 2023</TableCell>
                          <TableCell className="text-right">June 15, 2023</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Jamie Chen</TableCell>
                          <TableCell>UI/UX Design</TableCell>
                          <TableCell>Mar 2023</TableCell>
                          <TableCell className="text-right">June 22, 2023</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="pt-4">
                    <h4 className="font-medium mb-2">Recent Events</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 pb-3 border-b">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">Women in Tech Panel</p>
                          <p className="text-sm text-muted-foreground">Speaker - May 10, 2023</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Career Fair</p>
                          <p className="text-sm text-muted-foreground">Attendee - April 15, 2023</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 glass-card">
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
