
import React, { useState } from 'react';
import { Book, Search, MessageCircle, Calendar, BrainCircuit, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AIAssistantSection = () => {
  const [activeMessage, setActiveMessage] = useState(0);
  
  const chatMessages = [
    {
      question: "When is the next alumni networking event?",
      answer: "The next alumni networking event is on June 18th at 6 PM. It's the Summer Mixer at Grand Hotel. Would you like me to add it to your calendar?"
    },
    {
      question: "Can you recommend alumni mentors in data science?",
      answer: "I found 5 alumni mentors specializing in data science: Alex Chen (Microsoft), Priya Shah (Amazon), James Wilson (Netflix), Maria Lopez (Google), and David Kim (Meta). Would you like me to connect you with any of them?"
    },
    {
      question: "How do I access the scholarship resources?",
      answer: "Scholarship resources are available in the Resources section under Financial Aid. I can guide you there, or if you tell me what specific scholarship you're looking for, I can provide direct information."
    }
  ];
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveMessage((prev) => (prev + 1) % chatMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="ai-assistant" className="py-24 px-4 md:px-6 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-purple-500/5 blur-3xl animate-float" style={{animationDelay: '-3s'}}></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-pink-500/5 blur-3xl animate-float" style={{animationDelay: '-6s'}}></div>
        </div>
      </div>
      
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative animate-on-scroll">
            <div className="glass-card rounded-2xl shadow-strong overflow-hidden max-w-lg mx-auto transform transition-all duration-700 hover:-translate-y-2 hover:shadow-xl">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between relative overflow-hidden">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-purple-500/80 to-blue-600/80 opacity-0 hover:opacity-100 transition-opacity duration-1000 background-animate"></div>
                
                <div className="flex items-center relative z-10">
                  <div className="relative">
                    <BrainCircuit className="h-6 w-6 text-white mr-3 animate-pulse-subtle" />
                    {/* Light rays effect */}
                    <div className="absolute inset-0 -z-10 opacity-60">
                      <div className="absolute top-1/2 left-1/2 w-10 h-0.5 -translate-x-1/2 -translate-y-1/2 bg-white/20 blur-sm animate-spin-slow" style={{animationDuration: '15s'}}></div>
                      <div className="absolute top-1/2 left-1/2 w-10 h-0.5 -translate-x-1/2 -translate-y-1/2 bg-white/20 blur-sm rotate-45 animate-spin-slow" style={{animationDuration: '15s'}}></div>
                      <div className="absolute top-1/2 left-1/2 w-10 h-0.5 -translate-x-1/2 -translate-y-1/2 bg-white/20 blur-sm rotate-90 animate-spin-slow" style={{animationDuration: '15s'}}></div>
                      <div className="absolute top-1/2 left-1/2 w-10 h-0.5 -translate-x-1/2 -translate-y-1/2 bg-white/20 blur-sm rotate-135 animate-spin-slow" style={{animationDuration: '15s'}}></div>
                    </div>
                  </div>
                  <h3 className="text-white font-medium">AlumniConnect AI</h3>
                </div>
                <div className="flex space-x-2 relative z-10">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse-subtle"></div>
                  <span className="text-xs text-white/80">Online 24/7</span>
                </div>
              </div>
              
              <div className="p-6 space-y-6 min-h-[400px] relative">
                {/* Background pulse effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-8 rounded-full bg-blue-500/5 blur-3xl animate-pulse-subtle"></div>
                  <div className="absolute inset-12 rounded-full bg-purple-500/5 blur-3xl animate-pulse-subtle" style={{animationDelay: '-1.5s'}}></div>
                </div>
                
                {chatMessages.map((chat, index) => (
                  <div 
                    key={index}
                    className={`transition-all duration-500 ${activeMessage === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden'}`}
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 shadow-md transition-transform duration-500 hover:scale-110 hover:rotate-3">
                        <span className="font-semibold text-blue-600">U</span>
                      </div>
                      <div className="bg-blue-50 py-3 px-4 rounded-lg rounded-tl-none shadow-sm transform transition-all duration-500 hover:-translate-y-1 hover:shadow-md">
                        <p>{chat.question}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-md transition-transform duration-500 hover:scale-110 hover:rotate-3">
                        <div className="relative">
                          <BrainCircuit className="h-5 w-5 text-white animate-pulse-subtle" />
                          {/* Light rays effect */}
                          <div className="absolute inset-0 rounded-full animate-spin-slow" style={{animationDuration: '3s'}}>
                            <div className="absolute top-0 left-1/2 w-1 h-1 -ml-0.5 rounded-full bg-white/70"></div>
                          </div>
                        </div>
                      </div>
                      <div className="glass-card py-3 px-4 rounded-lg rounded-tl-none shadow-sm transform transition-all duration-500 hover:-translate-y-1 hover:shadow-md">
                        <p>{chat.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Ask the AI assistant..." 
                      className="w-full py-3 px-4 pr-12 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm transition-all duration-500 focus:shadow-md focus:-translate-y-1"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-125">
                      <MessageCircle className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-8 -right-8 md:-right-16 hidden md:block animate-float">
              <div className="glass-card rounded-xl shadow-medium p-4 max-w-[180px] transition-all duration-700 hover:-translate-y-2 hover:shadow-lg hover:rotate-2">
                <div className="flex mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></div>
                  <span className="text-xs text-green-600">Now available</span>
                </div>
                <p className="text-sm">Our AI is trained on the latest alumni resources and events</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 space-y-6 max-w-xl mx-auto lg:mx-0 animate-on-scroll">
            <div className="inline-block px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 rounded-full transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 hover:shadow-sm">
              AI-Powered Support
            </div>
            <h2 className="text-3xl md:text-4xl font-bold relative group">
              24/7 Intelligent Assistance for All Your Needs
              <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-blue-300/30 via-primary to-purple-300/30 rounded-full group-hover:w-full transition-all duration-1000 ease-in-out"></span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Our AI assistant leverages Azure's advanced machine learning to provide immediate, 
              accurate responses to your questions about alumni resources, events, and connections.
            </p>
            
            <div className="space-y-4 pt-4">
              {[
                {
                  icon: <MessageCircle className="h-5 w-5" />,
                  title: "Instant Responses",
                  description: "Get immediate answers to your questions, day or night"
                },
                {
                  icon: <Calendar className="h-5 w-5" />,
                  title: "Event Information",
                  description: "Stay updated on upcoming alumni events and activities"
                },
                {
                  icon: <Search className="h-5 w-5" />,
                  title: "Resource Finder",
                  description: "Quickly locate mentorship resources and career materials"
                },
                {
                  icon: <Book className="h-5 w-5" />,
                  title: "Knowledge Base",
                  description: "Access information from the entire alumni knowledge base"
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start transform transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] group">
                  <div className="mr-4 mt-1 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/15 transition-colors duration-500 shadow-sm group-hover:shadow-md overflow-hidden relative">
                    {/* Light animation for icons */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/30 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 relative">
                      {feature.title}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary/30 group-hover:w-full transition-all duration-500"></span>
                    </h3>
                    <p className="text-muted-foreground group-hover:text-gray-700 transition-colors duration-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-6">
              <Button 
                className="button-transition button-hover focus-ring relative overflow-hidden group bg-gradient-to-r from-primary to-blue-600"
                asChild
              >
                <Link to="/ai-chat" className="flex items-center gap-2">
                  <span className="absolute -top-10 -left-10 w-20 h-20 bg-white/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"></span>
                  <div className="relative">
                    <BrainCircuit className="h-5 w-5 text-white" />
                    {/* Orbiting particle effect */}
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 animate-spin-slow" style={{animationDuration: '3s'}}>
                      <div className="absolute top-0 left-1/2 w-1 h-1 -ml-0.5 rounded-full bg-white/70"></div>
                    </div>
                  </div>
                  <span>Try the AI Assistant</span>
                  <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse-subtle" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistantSection;
