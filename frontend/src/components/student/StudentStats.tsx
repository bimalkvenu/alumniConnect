
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, Award, LineChart } from 'lucide-react';

const StudentStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-stagger">
      {[
        { 
          icon: <BookOpen className="h-5 w-5" />, 
          label: "Courses Enrolled", 
          value: "4", 
          description: "Current Semester",
          bgColor: "bg-primary/10",
          iconColor: "text-primary",
          animationDelay: "delay-[100ms]"
        },
        { 
          icon: <Clock className="h-5 w-5" />, 
          label: "Assignments Due", 
          value: "5", 
          description: "Next 7 Days",
          bgColor: "bg-accent/10",
          iconColor: "text-accent",
          animationDelay: "delay-[200ms]"
        },
        { 
          icon: <Award className="h-5 w-5" />, 
          label: "Course Completion", 
          value: "75%", 
          description: "Semester Progress",
          bgColor: "bg-primary/10",
          iconColor: "text-primary",
          animationDelay: "delay-[300ms]",
          showProgress: true,
          progressValue: 75
        },
        { 
          icon: <LineChart className="h-5 w-5" />, 
          label: "Study Hours", 
          value: "32", 
          description: "This Month",
          bgColor: "bg-accent/10",
          iconColor: "text-accent",
          animationDelay: "delay-[400ms]"
        }
      ].map((stat, index) => (
        <Card 
          key={index} 
          className={`p-4 glass-card animate-fade-in ${stat.animationDelay} hover:shadow-medium transition-all duration-300`}
        >
          <div className="flex items-start justify-between">
            <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center mb-3`}>
              <div className={stat.iconColor}>{stat.icon}</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          {stat.showProgress && (
            <Progress value={stat.progressValue} className="h-1.5 mt-3" />
          )}
        </Card>
      ))}
    </div>
  );
};

export default StudentStats;
