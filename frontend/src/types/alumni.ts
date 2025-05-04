export interface AlumniProfileData {
  graduationYear: string;
  degree: string;
  currentCompany: string;
  currentRole: string;
  location: string;
  phone: string;
  bio: string;
  skills: string[];
  education: Array<{
    institution: string;
    degree: string;
    year: string;
    description: string;
  }>;
  experience: Array<{
    company: string;
    role: string;
    duration: string;
    description: string;
  }>;
  socialLinks: {
    linkedin?: string;
    website?: string;
  };
}

export interface AlumniUser {
    id: string;
    email: string;
    name: string;
    role: 'alumni';
    profilePhoto?: string;
    profile: AlumniProfileData;
    profileComplete: boolean;
}