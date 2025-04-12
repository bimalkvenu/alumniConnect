
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageCircle, 
  ArrowUp, 
  User,
  Clock,
  Phone,
  Video
} from 'lucide-react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

const MentorChat = () => {
  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Senior Software Engineer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3",
      online: true,
      lastActive: "Just now"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Data Scientist",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3",
      online: false,
      lastActive: "2 hours ago"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Designer",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3",
      online: true,
      lastActive: "Just now"
    }
  ];
  
  const [selectedMentor, setSelectedMentor] = useState(mentors[0]);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi Alex, how can I help you with your questions about machine learning algorithms?", 
      sender: "mentor", 
      timestamp: "10:03 AM"
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    
    // Simulate mentor response after a delay
    setTimeout(() => {
      const responses = [
        "That's a great question! The key difference between supervised and unsupervised learning is that supervised learning uses labeled data while unsupervised learning doesn't.",
        "I'd recommend starting with the basics of neural networks before diving into more complex architectures. Let me share a resource that helped me understand the fundamentals.",
        "For your project, you might want to consider using a random forest algorithm since it handles categorical data well and is less prone to overfitting.",
        "Let's schedule a call to discuss this in more detail. I can walk you through the implementation steps for your specific use case.",
        "Have you tried using cross-validation to evaluate your model? It's an essential technique to ensure your model generalizes well to unseen data."
      ];
      
      const mentorResponse = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "mentor",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, mentorResponse]);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Mentor list sidebar */}
      <div className="md:col-span-1">
        <Card className="glass-card rounded-xl animate-fade-in h-[550px] overflow-hidden">
          <CardHeader className="px-4 py-3">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" />
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {mentors.map(mentor => (
                <div 
                  key={mentor.id}
                  className={`p-3 flex items-center gap-3 cursor-pointer transition-colors hover:bg-slate-50 ${selectedMentor.id === mentor.id ? 'bg-slate-50' : ''}`}
                  onClick={() => setSelectedMentor(mentor)}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src={mentor.image} 
                        alt={mentor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {mentor.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-sm truncate">{mentor.name}</h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">12:30 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground truncate">{mentor.role}</p>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                        <span className="text-xs text-muted-foreground">{mentor.lastActive}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Chat area */}
      <div className="md:col-span-3">
        <Card className="glass-card rounded-xl overflow-hidden animate-fade-in h-[550px] flex flex-col">
          {/* Chat header */}
          <div className="p-3 border-b flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img 
                    src={selectedMentor.image} 
                    alt={selectedMentor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {selectedMentor.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div>
                <h3 className="font-medium text-sm leading-tight">{selectedMentor.name}</h3>
                <p className="text-xs text-muted-foreground leading-tight">
                  {selectedMentor.online ? 'Online' : selectedMentor.lastActive}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Video className="h-4 w-4" />
              </Button>
              
              <Menubar className="border-none shadow-none bg-transparent h-8">
                <MenubarMenu>
                  <MenubarTrigger className="h-8 w-8 p-0 data-[state=open]:bg-transparent focus:bg-slate-100 rounded-full flex items-center justify-center">
                    <svg width="15" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
                      <path d="M1.5 1.5C1.5 2.32843 2.17157 3 3 3C3.82843 3 4.5 2.32843 4.5 1.5C4.5 0.671573 3.82843 0 3 0C2.17157 0 1.5 0.671573 1.5 1.5Z" fill="currentColor" />
                      <path d="M6 1.5C6 2.32843 6.67157 3 7.5 3C8.32843 3 9 2.32843 9 1.5C9 0.671573 8.32843 0 7.5 0C6.67157 0 6 0.671573 6 1.5Z" fill="currentColor" />
                      <path d="M10.5 1.5C10.5 2.32843 11.1716 3 12 3C12.8284 3 13.5 2.32843 13.5 1.5C13.5 0.671573 12.8284 0 12 0C11.1716 0 10.5 0.671573 10.5 1.5Z" fill="currentColor" />
                    </svg>
                  </MenubarTrigger>
                  <MenubarContent align="end">
                    <MenubarItem>View profile</MenubarItem>
                    <MenubarItem>Clear chat history</MenubarItem>
                    <MenubarItem>Block contact</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
          
          {/* Messages area */}
          <div className="flex-grow overflow-y-auto p-4 bg-slate-50/50 space-y-4">
            {messages.map(message => (
              <div 
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                {message.sender === 'mentor' && (
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0 mt-1">
                    <img 
                      src={selectedMentor.image} 
                      alt={selectedMentor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div 
                  className={`max-w-[80%] p-3 rounded-lg flex flex-col ${
                    message.sender === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white border border-slate-200 rounded-tl-none'
                  }`}
                >
                  <span className="text-sm">{message.text}</span>
                  <span 
                    className={`text-xs ${message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'} self-end mt-1`}
                  >
                    {message.timestamp}
                  </span>
                </div>
                
                {message.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full overflow-hidden ml-2 flex-shrink-0 mt-1 bg-primary flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <div className="p-3 border-t">
            <div className="relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="min-h-[60px] pr-14 resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="absolute right-2 bottom-2 rounded-full"
                disabled={!input.trim()}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MentorChat;
