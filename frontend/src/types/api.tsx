export interface User {
    _id: string;
    name: string;
    email: string;
    graduationYear: number;
    degree: string;
    lastLogin?: string;
    // Add other fields
  }
  
  export interface Notification {
    _id: string;
    message: string;
    read: boolean;
    createdAt: string;
  }