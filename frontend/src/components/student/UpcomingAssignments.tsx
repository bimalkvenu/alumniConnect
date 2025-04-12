
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FileText, Calendar, Timer, AlertCircle } from 'lucide-react';

const UpcomingAssignments = () => {
  const assignments = [
    {
      id: 1,
      title: "Algorithm Analysis Paper",
      course: "CS 305",
      dueDate: "May 15, 2023",
      timeLeft: "2 days",
      progress: 75,
      priority: "High",
      priorityColor: "text-destructive bg-destructive/10"
    },
    {
      id: 2,
      title: "Database Design Project",
      course: "CS 201",
      dueDate: "May 20, 2023",
      timeLeft: "7 days",
      progress: 40,
      priority: "Medium",
      priorityColor: "text-amber-500 bg-amber-100"
    },
    {
      id: 3,
      title: "Linear Algebra Problem Set",
      course: "MATH 301",
      dueDate: "May 22, 2023",
      timeLeft: "9 days",
      progress: 10,
      priority: "Medium",
      priorityColor: "text-amber-500 bg-amber-100"
    },
    {
      id: 4,
      title: "Technical Writing Essay",
      course: "ENG 205",
      dueDate: "May 25, 2023",
      timeLeft: "12 days",
      progress: 0,
      priority: "Low",
      priorityColor: "text-green-600 bg-green-100"
    },
    {
      id: 5,
      title: "Final Project Presentation",
      course: "CS 305",
      dueDate: "June 5, 2023",
      timeLeft: "23 days",
      progress: 5,
      priority: "Low",
      priorityColor: "text-green-600 bg-green-100"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="glass-card p-6 rounded-xl animate-fade-in">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Upcoming Assignments
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pt-2 pb-0">
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div 
                key={assignment.id} 
                className="border-b pb-4 last:border-0 last:pb-0 hover:bg-muted/10 p-3 rounded-lg transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-base">{assignment.title}</h4>
                    <p className="text-sm text-muted-foreground">{assignment.course}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${assignment.priorityColor}`}>
                    {assignment.priority}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mt-3 mb-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{assignment.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Timer className="h-4 w-4" />
                    <span>{assignment.timeLeft} left</span>
                  </div>
                </div>
                
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{assignment.progress}%</span>
                  </div>
                  <Progress value={assignment.progress} className="h-1.5" />
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-4 focus-ring">
            View All Assignments
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpcomingAssignments;
