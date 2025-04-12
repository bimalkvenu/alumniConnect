
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { BookOpen, Award, LineChart, ChevronRight } from 'lucide-react';

const CourseProgress = () => {
  const courses = [
    {
      id: 1,
      code: "CS 201",
      name: "Database Systems",
      progress: 80,
      grade: "A",
      instructor: "Dr. Sarah Johnson",
      credits: 4,
      assignments: 12,
      completed: 10
    },
    {
      id: 2,
      code: "CS 305",
      name: "Advanced Algorithms",
      progress: 75,
      grade: "B+",
      instructor: "Prof. Michael Chen",
      credits: 4,
      assignments: 8,
      completed: 6
    },
    {
      id: 3,
      code: "MATH 301",
      name: "Linear Algebra",
      progress: 65,
      grade: "B",
      instructor: "Dr. Emily Rodriguez",
      credits: 3,
      assignments: 10,
      completed: 7
    },
    {
      id: 4,
      code: "ENG 205",
      name: "Technical Writing",
      progress: 90,
      grade: "A-",
      instructor: "Prof. David Park",
      credits: 3,
      assignments: 6,
      completed: 5
    }
  ];

  const gradeData = [
    { name: 'CS 201', grade: 92 },
    { name: 'CS 305', grade: 88 },
    { name: 'MATH 301', grade: 83 },
    { name: 'ENG 205', grade: 91 },
  ];

  const chartConfig = {
    grade: {
      label: 'Grade',
      theme: {
        light: '#8B5CF6',
        dark: '#8B5CF6',
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Grade Chart */}
      <Card className="glass-card p-6 rounded-xl animate-fade-in">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <LineChart className="h-5 w-5 text-primary" />
            Current Semester Grades
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pt-2 pb-0">
          <div className="h-64 w-full">
            <ChartContainer config={chartConfig}>
              <BarChart data={gradeData}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="grade" name="Grade" fill="var(--color-grade)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Course List */}
      <Card className="glass-card p-6 rounded-xl animate-fade-in delay-100">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Enrolled Courses
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pt-2 pb-0">
          <div className="space-y-4">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="border rounded-lg p-4 hover:border-primary/30 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{course.code}</h4>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {course.credits} credits
                      </span>
                    </div>
                    <p className="font-medium">{course.name}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Current Grade</div>
                    <div className="text-xl font-bold">{course.grade}</div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  Instructor: {course.instructor}
                </p>
                
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Course Progress</span>
                  <span className="text-xs font-medium">
                    {course.completed}/{course.assignments} assignments completed
                  </span>
                </div>
                <Progress value={course.progress} className="h-1.5" />
                
                <div className="flex justify-end mt-3">
                  <div className="text-primary flex items-center text-sm font-medium">
                    <span>View Details</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseProgress;
