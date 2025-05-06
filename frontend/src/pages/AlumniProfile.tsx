import React, { useState, useEffect } from 'react';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import api from '@/api';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Briefcase, GraduationCap, Edit, MapPin, Mail, Phone, Globe, Linkedin as LinkedinIcon, Users as UsersIcon, Check, Plus, Trash } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AlumniProfileData, AlumniUser } from '@/types/alumni';
import LoadingSpinner from '@/components/LoadingSpinner';

const AlumniProfile = () => {
  const { user: authUser, setUser } = useAuth();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  // Cast the authUser to AlumniUser type
  const user = authUser as AlumniUser | null;

  const [formData, setFormData] = useState<AlumniProfileData>({
    graduationYear: '',
    degree: '',
    currentCompany: '',
    currentRole: '',
    location: '',
    phone: '',
    bio: '',
    skills: [],
    education: [],
    experience: [],
    socialLinks: {}
  });

  // Initialize form data when user loads
  useEffect(() => {
    if (user) {
      setPreviewUrl(user.profilePhoto || '');
      setFormData({
        graduationYear: user.profile?.graduationYear || '',
        degree: user.profile?.degree || '',
        currentCompany: user.profile?.currentCompany || '',
        currentRole: user.profile?.currentRole || '',
        location: user.profile?.location || '',
        phone: user.profile?.phone || '',
        bio: user.profile?.bio || '',
        skills: user.profile?.skills || [],
        education: user.profile?.education || [],
        experience: user.profile?.experience || [],
        socialLinks: user.profile?.socialLinks || {}
      });

      // If profile is incomplete, automatically enter edit mode
      if (!user.profileComplete) {
        setIsEditMode(true);
      }
    }
  }, [user]);

  // Error message helper function
  const getErrorMessage = (error: unknown): string => {
    if (typeof error === 'string') return error;
    if (error instanceof Error) return error.message;
    if (typeof error === 'object' && error !== null) {
      const apiError = error as {
        response?: {
          data?: {
            error?: string;
            message?: string;
          };
        };
        message?: string;
      };
      return apiError.response?.data?.error || 
             apiError.response?.data?.message || 
             apiError.message || 
             'An unknown error occurred';
    }
    return 'An unknown error occurred';
  }

  const calculateCompletion = (): number => {
    const requiredFields = ['graduationYear', 'degree', 'currentRole'];
    const completedFields = requiredFields.filter(field => {
      const value = formData[field as keyof typeof formData];
      return value && value.toString().trim() !== '';
    });
    return (completedFields.length / requiredFields.length) * 100;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const completionPercentage = calculateCompletion();
      const updatedData = {
        ...formData,
        profileComplete: completionPercentage === 100
      };

      const response = await api.put('/alumni/me', { profile: updatedData });
      
      if (!response.data?.success || !response.data.data) {
        throw new Error(response.data?.error || 'Update failed');
      }

      // Update user context with new data
      setUser({
        ...response.data.data,
        profileComplete: completionPercentage === 100
      });
      
      setIsEditMode(false);
      toast.success('Profile updated successfully!');
      
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error('Update error:', error);
      setErrors({ form: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSocialLinkChange = (platform: keyof AlumniProfileData['socialLinks'], value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...(prev.socialLinks || {}),
        [platform]: value
      }
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProfilePhoto = async () => {
    if (!selectedFile) return;
    
    setUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append('profilePhoto', selectedFile);

      const response = await api.put('/alumni/upload-profile-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data?.success) {
        setUser(response.data.user);
        toast.success('Profile photo updated successfully!');
        setSelectedFile(null);
      }
    } catch (error) {
      toast.error('Failed to upload profile photo');
      console.error('Upload error:', error);
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleAddEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, {
        institution: '',
        degree: '',
        year: '',
        description: ''
      }]
    }));
  };

  const handleEducationChange = (index: number, field: keyof AlumniProfileData['education'][0], value: string) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    setFormData(prev => ({ ...prev, education: updatedEducation }));
  };

  const handleRemoveEducation = (index: number) => {
    const updatedEducation = [...formData.education];
    updatedEducation.splice(index, 1);
    setFormData(prev => ({ ...prev, education: updatedEducation }));
  };

  const handleAddExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        company: '',
        role: '',
        duration: '',
        description: ''
      }]
    }));
  };

  const handleExperienceChange = (index: number, field: keyof AlumniProfileData['experience'][0], value: string) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    setFormData(prev => ({ ...prev, experience: updatedExperience }));
  };

  const handleRemoveExperience = (index: number) => {
    const updatedExperience = [...formData.experience];
    updatedExperience.splice(index, 1);
    setFormData(prev => ({ ...prev, experience: updatedExperience }));
  };

  const ProfileForm = () => {
    const socialLinks = formData.socialLinks || {};

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Professional Information Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Professional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentRole">Current Role*</Label>
              <Input
                id="currentRole"
                name="currentRole"
                value={formData.currentRole}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentCompany">Current Company</Label>
              <Input
                id="currentCompany"
                name="currentCompany"
                value={formData.currentCompany}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="graduationYear">Graduation Year*</Label>
              <Input
                id="graduationYear"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="degree">Degree*</Label>
              <Input
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </Card>

        {/* About Me Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">About Me</h3>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your professional journey, expertise, and interests..."
            />
          </div>
        </Card>

        {/* Skills Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Skills & Expertise</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'Cloud Computing', 
              'Project Management', 'Data Analysis', 'UI/UX Design', 'Machine Learning'].map((skill) => (
              <Badge
                key={skill}
                variant={formData.skills.includes(skill) ? 'default' : 'secondary'}
                onClick={() => handleSkillToggle(skill)}
                className="cursor-pointer"
              >
                {skill}
                {formData.skills.includes(skill) && <Check className="h-3 w-3 ml-1" />}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Add custom skill"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  handleSkillToggle(e.currentTarget.value.trim());
                  e.currentTarget.value = '';
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={(e) => {
                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                if (input.value.trim()) {
                  handleSkillToggle(input.value.trim());
                  input.value = '';
                }
              }}
            >
              Add
            </Button>
          </div>
        </Card>

        {/* Education Background Section */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Education Background</h3>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={handleAddEducation}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>
          <div className="space-y-4">
            {formData.education.map((edu, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`education-institution-${index}`}>Institution</Label>
                  <Input
                    id={`education-institution-${index}`}
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    placeholder="University Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`education-degree-${index}`}>Degree</Label>
                  <Input
                    id={`education-degree-${index}`}
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    placeholder="Degree Earned"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`education-year-${index}`}>Year</Label>
                  <Input
                    id={`education-year-${index}`}
                    value={edu.year}
                    onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                    placeholder="Graduation Year"
                  />
                </div>
                <div className="flex items-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveEducation(index)}
                    className="h-10 w-10"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Work Experience Section */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Work Experience</h3>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={handleAddExperience}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>
          <div className="space-y-4">
            {formData.experience.map((exp, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`experience-company-${index}`}>Company</Label>
                  <Input
                    id={`experience-company-${index}`}
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                    placeholder="Company Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`experience-role-${index}`}>Role</Label>
                  <Input
                    id={`experience-role-${index}`}
                    value={exp.role}
                    onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                    placeholder="Job Title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`experience-duration-${index}`}>Duration</Label>
                  <Input
                    id={`experience-duration-${index}`}
                    value={exp.duration}
                    onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                    placeholder="e.g. 2020 - Present"
                  />
                </div>
                <div className="flex items-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveExperience(index)}
                    className="h-10 w-10"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Social Links Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                name="linkedin"
                value={socialLinks.linkedin || ''}
                onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Personal Website</Label>
              <Input
                id="website"
                name="website"
                value={socialLinks.website || ''}
                onChange={(e) => handleSocialLinkChange('website', e.target.value)}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => setIsEditMode(false)}
            type="button"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={calculateCompletion() < 100 || isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : 'Save Profile'}
          </Button>
        </div>
      </form>
    );
  };

  const renderProfileView = () => {
    return (
      <>
        <div className="mb-8 relative">
          <div className="h-48 rounded-xl overflow-hidden mb-16">
            <img 
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop" 
              alt="Profile Banner" 
              className="w-full h-full object-cover"
            />
          </div>
        
          <div className="absolute left-8 bottom-0 transform translate-y-1/2 flex flex-col sm:flex-row items-start sm:items-end gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-100 overflow-hidden">
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt={user?.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                    <UsersIcon className="h-10 w-10" />
                  </div>
               )}
              </div>            
              <label 
                htmlFor="profile-photo-upload"
                className="absolute bottom-0 right-0 rounded-full bg-white p-2 shadow-md cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <Edit className="h-4 w-4" />
                <input
                  id="profile-photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>    
              {selectedFile && (
                <div className="absolute -bottom-10 left-0 right-0 flex justify-center">
                  <Button
                    size="sm"
                    onClick={uploadProfilePhoto}
                    disabled={uploadingPhoto}
                    className="text-xs"
                  >
                    {uploadingPhoto ? 'Uploading...' : 'Save Photo'}
                  </Button>
                </div>
              )}
            </div>
            <div className="sm:mb-4">
              <h1 className="text-2xl md:text-3xl font-bold">{user?.name}</h1>
              <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                {user?.profile?.degree && user?.profile?.graduationYear && (
                  <>
                    <span className="flex items-center gap-1">
                      <GraduationCap className="h-4 w-4" />
                      {user.profile.degree}, Class of {user.profile.graduationYear}
                    </span>
                    <span className="hidden sm:inline">•</span>
                  </>
                )}
                {user?.profile?.currentRole && user?.profile?.currentCompany && (
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {user.profile.currentRole} at {user.profile.currentCompany}
                  </span>
                )}
              </div>
            </div>
          </div>      
          <div className="flex justify-end gap-3 mt-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              asChild
            >
              <Link to="/alumni-portal">
                <GraduationCap className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button 
              className="flex items-center gap-2"
              onClick={() => setIsEditMode(true)}
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user?.email || 'Not provided'}</p>
                  </div>
                </div>
              
                {user?.profile?.phone && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{user.profile.phone}</p>
                    </div>
                  </div>
                )}
              
                {user?.profile?.location && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{user.profile.location}</p>
                    </div>
                  </div>
                )}
              </div>
            
              {(user?.profile?.socialLinks?.linkedin || user?.profile?.socialLinks?.website) && (
                <div className="mt-6 pt-4 border-t">
                  <h4 className="text-sm font-semibold mb-3">Social Media</h4>
                  <div className="flex gap-2">
                    {user.profile.socialLinks.linkedin && (
                      <Button size="icon" variant="outline" asChild>
                        <a href={user.profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                          <LinkedinIcon className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {user.profile.socialLinks.website && (
                      <Button size="icon" variant="outline" asChild>
                        <a href={user.profile.socialLinks.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </Card>
          
            {user?.profile?.skills?.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {user.profile.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-4 w-full"
                  onClick={() => setIsEditMode(true)}
                >
                  <Edit className="h-3 w-3 mr-2" />
                  Edit Skills
                </Button>
              </Card>
            )}
          </div>
        
          <div className="lg:col-span-2 space-y-6">
            {user?.profile?.bio && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">About Me</h3>
                <p className="text-muted-foreground whitespace-pre-line">{user.profile.bio}</p>
              </Card>
            )}
          
            <Tabs defaultValue="education" className="w-full">
              <TabsList className="w-full mb-6 grid grid-cols-2 h-auto bg-muted/50 p-1 rounded-lg">
                <TabsTrigger value="education" className="py-2 data-[state=active]:bg-white flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Education</span>
                </TabsTrigger>
                <TabsTrigger value="experience" className="py-2 data-[state=active]:bg-white flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>Experience</span>
                </TabsTrigger>
              </TabsList>
            
              <TabsContent value="education" className="mt-0 space-y-4">
                {user?.profile?.education?.length > 0 ? (
                  user.profile.education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-primary/30 pl-4 ml-2 relative">
                      <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                      <div className="mb-1">
                        <h4 className="text-base font-semibold">{edu.degree}</h4>
                        <p className="text-muted-foreground">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.year}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>No education information added yet.</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => setIsEditMode(true)}
                    >
                      Add Education
                    </Button>
                  </div>
                )}
              </TabsContent>
            
              <TabsContent value="experience" className="mt-0 space-y-4">
                {user?.profile?.experience?.length > 0 ? (
                  user.profile.experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-primary/30 pl-4 ml-2 relative">
                      <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
                      <div className="mb-1">
                        <h4 className="text-base font-semibold">{exp.role}</h4>
                        <p className="text-muted-foreground">{exp.company}</p>
                        <p className="text-sm text-muted-foreground">{exp.duration}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>No work experience added yet.</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => setIsEditMode(true)}
                    >
                      Add Experience
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </>
    );
  };

  const renderProfileContent = () => {
    if (!user) {
      return (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      );
    }

    if (isEditMode) {
      return <ProfileForm />;
    }

    if (!user.profileComplete) {
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
          <p className="text-muted-foreground mb-6">
            Your profile is {Math.round(calculateCompletion())}% complete. 
            Please complete your profile to access all features.
          </p>
          <div className="w-full max-w-md mx-auto mb-6">
            <Progress value={calculateCompletion()} className="h-2" />
          </div>
          <Button onClick={() => setIsEditMode(true)}>
            Complete Profile Now
          </Button>
        </div>
      );
    }

    return renderProfileView();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          {renderProfileContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AlumniProfile;