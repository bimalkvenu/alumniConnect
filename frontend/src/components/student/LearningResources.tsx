
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BookOpen, Video, FileText, ExternalLink, Play, Download, BookMarked, Library } from 'lucide-react';

const LearningResources = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full mb-6 h-auto bg-muted/50 p-1 rounded-lg">
          <TabsTrigger value="all" className="py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            All Resources
          </TabsTrigger>
          <TabsTrigger value="videos" className="py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Video Lectures
          </TabsTrigger>
          <TabsTrigger value="readings" className="py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Reading Materials
          </TabsTrigger>
          <TabsTrigger value="library" className="py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Library Access
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="space-y-6">
            <Card className="glass-card p-6 rounded-xl animate-fade-in">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  Featured Video Lectures
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pt-2 pb-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { 
                      title: "Introduction to Database Indexing", 
                      course: "CS 201",
                      duration: "45 min",
                      instructor: "Dr. Sarah Johnson"
                    },
                    { 
                      title: "Dynamic Programming Techniques", 
                      course: "CS 305",
                      duration: "55 min",
                      instructor: "Prof. Michael Chen"
                    },
                  ].map((video, index) => (
                    <div 
                      key={index} 
                      className="border rounded-lg p-4 hover:shadow-medium transition-all cursor-pointer bg-card/50 backdrop-blur-sm group"
                    >
                      <div className="relative aspect-video bg-black/10 rounded-md mb-3 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button size="icon" variant="secondary" className="h-12 w-12 rounded-full opacity-90 group-hover:bg-primary group-hover:text-white transition-colors">
                            <Play className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                      <h4 className="font-medium text-base line-clamp-1">{video.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{video.course} • {video.duration}</p>
                      <p className="text-xs text-muted-foreground mt-1">{video.instructor}</p>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4 focus-ring">
                  View All Video Lectures
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass-card p-6 rounded-xl animate-fade-in delay-100">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Reading Materials
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pt-2 pb-0">
                <div className="space-y-3">
                  {[
                    { 
                      title: "Database Systems: The Complete Book", 
                      course: "CS 201",
                      type: "Textbook",
                      pages: "Chapter 5-7"
                    },
                    { 
                      title: "Introduction to Algorithms", 
                      course: "CS 305",
                      type: "Textbook",
                      pages: "Chapter 15"
                    },
                    { 
                      title: "Linear Algebra and Its Applications", 
                      course: "MATH 301",
                      type: "Textbook",
                      pages: "Chapter 3"
                    },
                  ].map((reading, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-3 p-3 border rounded-lg hover:border-primary/30 transition-colors"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookMarked className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-base">{reading.title}</h4>
                        <div className="flex justify-between">
                          <p className="text-sm text-muted-foreground">{reading.course} • {reading.type}</p>
                          <p className="text-sm text-muted-foreground">{reading.pages}</p>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4 focus-ring">
                  View All Reading Materials
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass-card p-6 rounded-xl animate-fade-in delay-200">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Library className="h-5 w-5 text-primary" />
                  Online Library Access
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pt-2 pb-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { 
                      name: "ACM Digital Library", 
                      description: "Computer Science Publications",
                      icon: <ExternalLink className="h-4 w-4" />
                    },
                    { 
                      name: "IEEE Xplore", 
                      description: "Engineering & Computer Science",
                      icon: <ExternalLink className="h-4 w-4" />
                    },
                    { 
                      name: "JSTOR", 
                      description: "Academic Journals & Books",
                      icon: <ExternalLink className="h-4 w-4" />
                    },
                  ].map((resource, index) => (
                    <div 
                      key={index} 
                      className="border rounded-lg p-4 hover:shadow-medium hover:-translate-y-1 transition-all cursor-pointer bg-card/50 backdrop-blur-sm"
                    >
                      <h4 className="font-medium text-base">{resource.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                      <Button variant="secondary" size="sm" className="w-full gap-1">
                        Access {resource.icon}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="videos" className="mt-0">
          <Card className="glass-card p-6 rounded-xl">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-semibold">Video Lectures</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pt-2 pb-0">
              {/* Video lectures content */}
              <p className="text-muted-foreground">All video lectures for your current courses.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="readings" className="mt-0">
          <Card className="glass-card p-6 rounded-xl">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-semibold">Reading Materials</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pt-2 pb-0">
              {/* Reading materials content */}
              <p className="text-muted-foreground">All reading materials for your current courses.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="library" className="mt-0">
          <Card className="glass-card p-6 rounded-xl">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-semibold">Library Access</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pt-2 pb-0">
              {/* Library access content */}
              <p className="text-muted-foreground">Access to digital libraries and academic resources.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningResources;
