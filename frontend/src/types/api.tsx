export interface User {
  id: string;
  name: string;
  email: string;
  graduationYear: number;
  degree: string;
  lastLogin?: string;
  program?: string;
  // Profile fields
  phone?: string;
  address?: string;
  year?: string;
  section?: string;
  bio?: string;
  interests?: string[];
  profileComplete?: boolean;
  gpa?: string;
  achievements?: Achievement[];
  courses?: Course[];
  activities?: Activity[];
  mentors?: Mentor[];
  events?: Event[];
  socialLinks?: {
    linkedin?: string;
    website?: string;
  };
}

interface Achievement {
  title: string;
  description?: string;
  date?: string;
  icon?: string;
}

interface Course {
  code: string;
  name: string;
  professor?: string;
  schedule?: string;
  grade?: string;
  progress?: number;
}

interface Activity {
  name: string;
  role?: string;
  date?: string;
  description?: string;
}

interface Mentor {
  name: string;
  position: string;
  since: string;
  nextMeeting: string;
}

interface Event {
  name: string;
  date: string;
}
  
  export interface Notification {
    _id: string;
    message: string;
    read: boolean;
    createdAt: string;
  }