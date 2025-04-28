export interface AlumniProfileData {
    graduationYear: string;
    degree: string;
    currentCompany?: string;
    currentRole?: string;
    location?: string;
    phone?: string;
    bio?: string;
    skills: string[];
    education: Education[];
    experience: Experience[];
    socialLinks: {
      linkedin?: string;
      website?: string;
      twitter?: string;
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