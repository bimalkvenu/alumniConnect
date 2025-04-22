import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Users, MessageCircle, Calendar, Bell, Briefcase, BookOpen, User } from 'lucide-react';
import AlumniDashboard from '@/components/alumni/AlumniDashboard';
import AlumniConnections from '@/components/alumni/AlumniConnections';
import AlumniMentorship from '@/components/alumni/AlumniMentorship';
import { Link } from 'react-router-dom';

const AlumniPortal = () => {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/user/me'); // replace with your actual endpoint
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      } finally {
        setLoading(false)
      }
    };
  
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('/notifications');
        setNotifications(res.data);
      } catch (err) {
        console.error(err);
      }
    };
  
    const fetchMessages = async () => {
      try {
        const res = await axios.get('/messages');
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchNotifications();
    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Welcome Header */}
          {!loading && (
          <div className="mb-8 p-6 glass-card rounded-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome Back, {user?.name || 'User'}</h1>
                <p className="text-muted-foreground">
                  {user?.department} '{user?.graduationYear}' | Last login: {user?.lastLogin}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="flex items-center gap-2 focus-ring">
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Notifications</span>
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                    {notifications.length}
                  </span>
                </Button>
                <Button className="relative flex items-center gap-2 button-transition button-hover focus-ring">
                  <MessageCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Messages</span>
                  {messages.length > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 w-5 h-5 text-xs font-bold text-white bg-primary rounded-full flex items-center justify-center">
                    {messages.length}
                  </span>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 focus-ring"
                  asChild
                >
                  <Link to="/alumni-profile">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">My Profile</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          )}
          
          {/* Main Tabs Navigation */}
          {loading ? (
            <div className="text-center mt-10">Loading...</div>
          ) : (
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="w-full mb-8 grid grid-cols-2 md:grid-cols-3 h-auto bg-muted/50 p-1 rounded-lg">
              <TabsTrigger value="dashboard" className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span>Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="connections" className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Connections</span>
              </TabsTrigger>
              <TabsTrigger value="mentorship" className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>Mentorship</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="mt-0">
              <AlumniDashboard user={user} />
            </TabsContent>

            <TabsContent value="connections" className="mt-0">
              <AlumniConnections user={user}/>
            </TabsContent>
              
            <TabsContent value="mentorship" className="mt-0">
              <AlumniMentorship user={user} />
            </TabsContent>
          </Tabs>
            )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AlumniPortal;
