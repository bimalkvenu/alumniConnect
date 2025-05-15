import React, { useState, useEffect } from 'react';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import api from '@/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, GraduationCap, Award, Edit, MapPin, Mail, Phone, Globe, LinkedinIcon, Users as UsersIcon } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const StudentProfile = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(authUser);
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(user?.profilePhoto || '');

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    program: user?.program || '',
    year: user?.year || '',
    section: user?.section || '',
    bio: user?.bio || '',
    interests: user?.interests ?? [],
    profileComplete: user?.profileComplete || false,
    gpa: user?.gpa || '',
    achievements: user?.achievements || [],
    socialLinks: user?.socialLinks || { linkedin: '', website: '' }
  });

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

  // Calculate Completion Percentage
  const calculateCompletion = () => {
    const requiredFields = ['name', 'program', 'year', 'email'];
    const completedFields = requiredFields.filter(field => {
      const value = formData[field as keyof typeof formData];
      return value && value.toString().trim() !== '';
    });
    return (completedFields.length / requiredFields.length) * 100;
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const updatedData = {
        ...formData,
        profileComplete: calculateCompletion() === 100
      };
      
      // Update the profile
      const response = await api.put('/students/me', updatedData);
      
      if (!response.data?.success) {
        throw new Error(response.data?.error || 'Update failed');
      }

      // Get fresh user data after update
      const userResponse = await api.get('/auth/me');
      const profileResponse = await api.get('/students/me');

      // Merge the data properly
      const updatedUser = {
        ...userResponse.data.data?.user,
        ...userResponse.data.data?.profile,
        ...profileResponse.data.data,
        profileComplete: calculateCompletion() === 100,
        socialLinks: profileResponse.data.data?.socialLinks || 
                   userResponse.data.data?.profile?.socialLinks || 
                   { linkedin: '', website: '' }
      };

      // Update all states
      setUser(updatedUser);
      setFormData(updatedUser);
      setPreviewUrl(updatedUser.profilePhoto || '');
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setIsEditMode(false);
      toast.success('Profile updated successfully!');
      
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error('Update error:', error);
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
  
  const handleSocialLinkChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...(prev.socialLinks || { linkedin: '', website: '' }),
        [platform]: value
      }
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create preview URL
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

      const response = await api.put('/auth/upload-profile-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data?.success) {
        // Get fresh data after upload
        const userResponse = await api.get('/auth/me');
        const profileResponse = await api.get('/students/me');

        const updatedUser = {
          ...userResponse.data.data?.user,
          ...userResponse.data.data?.profile,
          ...profileResponse.data.data,
          profileComplete: calculateCompletion() === 100,
          socialLinks: profileResponse.data.data?.socialLinks || 
                     userResponse.data.data?.profile?.socialLinks || 
                     { linkedin: '', website: '' }
        };

        setUser(updatedUser);
        setFormData(updatedUser);
        setPreviewUrl(updatedUser.profilePhoto || '');
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        toast.success('Profile photo updated successfully!');
      }
    } catch (error) {
      toast.error('Failed to upload profile photo');
      console.error('Upload error:', error);
    } finally {
      setUploadingPhoto(false);
    }
  };

  useEffect(() => {
    if (user && !isEditMode) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        program: user.program || '',
        year: user.year || '',
        section: user.section || '',
        bio: user.bio || '',
        interests: user.interests ?? [],
        profileComplete: user.profileComplete || false,
        gpa: user.gpa || '',
        achievements: user.achievements || [],
        socialLinks: user.socialLinks || { linkedin: '', website: '' }
      });
      setPreviewUrl(user.profilePhoto || '');
    }
  }, [user, isEditMode]);

  // Add this useEffect to fetch student data when component mounts
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const [userResponse, profileResponse] = await Promise.all([
          api.get('/auth/me'),
          api.get('/students/me')
        ]);
        
        // Merge the data properly
        const updatedUser = {
          ...userResponse.data.data?.user,
          ...userResponse.data.data?.profile,
          ...profileResponse.data.data,
          socialLinks: profileResponse.data.data?.socialLinks || 
                     userResponse.data.data?.profile?.socialLinks || 
                     { linkedin: '', website: '' }
        };

        setUser(updatedUser);
        setFormData(updatedUser);
        setPreviewUrl(updatedUser.profilePhoto || '');
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
      } catch (error) {
        console.error('Failed to fetch student data:', error);
        toast.error('Failed to load profile data');
      }
    };

    if (authUser?.role === 'student') {
      fetchStudentData();
    }
  }, [authUser]);

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleAddAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, {
        title: '',
        description: '',
        date: '',
        icon: 'Award'
      }]
    }));
  };

  const handleAchievementChange = (index: number, field: string, value: string) => {
    const updatedAchievements = [...formData.achievements];
    updatedAchievements[index] = {
      ...updatedAchievements[index],
      [field]: value
    };
    setFormData(prev => ({ ...prev, achievements: updatedAchievements }));
  };

  useEffect(() => {
    if (user && !user.profileComplete) {
      setIsEditMode(true);
    }
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ProfileForm = () => {
    const socialLinks = formData.socialLinks || { linkedin: '', website: '' };

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Campus Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gpa">GPA</Label>
              <Input
                id="gpa"
                name="gpa"
                value={formData.gpa}
                onChange={handleChange}
                type="number"
                step="0.01"
                min="0"
                max="4"
              />
            </div>
          </div>
        </Card>
  
        {/* Academic Information Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Academic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="program">Program</Label>
              <Select 
                name="program"
                value={formData.program}
                onValueChange={(value) => setFormData(prev => ({...prev, program: value}))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Information Technology">Information Technology</SelectItem>
                  <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                  <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select 
                name="year"
                value={formData.year}
                onValueChange={(value) => setFormData(prev => ({...prev, year: value}))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">First Year</SelectItem>
                  <SelectItem value="2">Second Year</SelectItem>
                  <SelectItem value="3">Third Year</SelectItem>
                  <SelectItem value="4">Fourth Year</SelectItem>
                  <SelectItem value="5+">Fifth Year or Above</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="section">Section</Label>
              <Input
                id="section"
                name="section"
                value={formData.section}
                onChange={handleChange}
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
              placeholder="Tell us about yourself, your academic interests, and career goals..."
            />
          </div>
        </Card>
  
        {/* Interests Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Academic Interests</h3>
          <div className="flex flex-wrap gap-2">
            {['AI', 'Web Dev', 'Data Science', 'Cybersecurity', 'UX/UI Design', 'Mobile Development', 'Cloud Computing', 'Game Development'].map((interest) => (
              <Badge
                key={interest}
                variant={(formData.interests || []).includes(interest) ? 'default' : 'secondary'}
                onClick={() => handleInterestToggle(interest)}
                className="cursor-pointer"
              >
                {interest}
              </Badge>
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
                  value={socialLinks.linkedin}
                  onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Personal Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={socialLinks.website}
                  onChange={(e) => handleSocialLinkChange('website', e.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
        </Card>

        {/* Achievements Section */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Achievements</h3>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={handleAddAchievement}
            >
              Add Achievement
            </Button>
          </div>
          <div className="space-y-4">
            {formData.achievements?.map((achievement, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`achievement-title-${index}`}>Title</Label>
                  <Input
                    id={`achievement-title-${index}`}
                    value={achievement.title}
                    onChange={(e) => handleAchievementChange(index, 'title', e.target.value)}
                    placeholder="Dean's List, Research Assistant, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`achievement-date-${index}`}>Date</Label>
                  <Input
                    id={`achievement-date-${index}`}
                    value={achievement.date}
                    onChange={(e) => handleAchievementChange(index, 'date', e.target.value)}
                    placeholder="Fall 2022, Jan 2023 - Present, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`achievement-description-${index}`}>Description</Label>
                  <Input
                    id={`achievement-description-${index}`}
                    value={achievement.description}
                    onChange={(e) => handleAchievementChange(index, 'description', e.target.value)}
                    placeholder="Brief description of your achievement"
                  />
                </div>
              </div>
            ))}
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

  const renderProfileContent = () => {
    if (!user) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
    }
    if (isEditMode || !user.profileComplete) {
      return <ProfileForm />;
    }
    return (
      <>
        <div className="mb-8 relative">
          <div className="h-48 rounded-xl overflow-hidden mb-16">
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" 
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
          </div>      
          <div className="flex justify-end gap-3 mt-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              asChild
            >
              <Link to="/student-portal">
                <BookOpen className="h-4 w-4" />
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
            <Card className="p-6 glass-card">
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
              
                {user?.phone && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  </div>
                )}
              
                {user?.address && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Campus Address</p>
                      <p className="font-medium">{user.address}</p>
                    </div>
                  </div>
                )}
              </div>
            
              {(user?.socialLinks?.linkedin || user?.socialLinks?.website) && (
                <div className="mt-6 pt-4 border-t">
                  <h4 className="text-sm font-semibold mb-3">Social Media</h4>
                  <div className="flex gap-2">
                    {user.socialLinks.linkedin && (
                      <Button size="icon" variant="outline" asChild>
                        <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                          <LinkedinIcon className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {user.socialLinks.website && (
                      <Button size="icon" variant="outline" asChild>
                        <a href={user.socialLinks.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </Card>
          
            {user?.interests?.length > 0 && (
              <Card className="p-6 glass-card">
                <h3 className="text-lg font-semibold mb-4">Academic Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest) => (
                    <Badge key={interest} variant="secondary">{interest}</Badge>
                  ))}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-4 w-full"
                  onClick={() => setIsEditMode(true)}
                >
                  <Edit className="h-3 w-3 mr-2" />
                  Edit Interests
                </Button>
              </Card>
            )}
          
            {user?.achievements?.length > 0 && (
              <Card className="p-6 glass-card">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Achievements
                </h3>
                <div className="space-y-4">
                  {user.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Award className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium">{achievement.title}</p>
                        {achievement.description && <p className="text-sm">{achievement.description}</p>}
                        {achievement.date && <p className="text-sm text-muted-foreground">{achievement.date}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        
          <div className="lg:col-span-2 space-y-6">
            {user?.bio && (
              <Card className="p-6 glass-card">
                <h3 className="text-lg font-semibold mb-4">About Me</h3>
                <p className="text-muted-foreground whitespace-pre-line">{user.bio}</p>
              </Card>
            )}
            
            <Card className="p-6 glass-card">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Academic Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Program</p>
                  <p className="font-medium">{user?.program || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-medium">
                    {user?.year === '1' ? 'First Year' : 
                     user?.year === '2' ? 'Second Year' : 
                     user?.year === '3' ? 'Third Year' : 
                     user?.year === '4' ? 'Fourth Year' : 
                     user?.year === '5+' ? 'Fifth Year or Above' : 
                     'Not specified'}
                  </p>
                </div>
                {user?.section && (
                  <div>
                    <p className="text-sm text-muted-foreground">Section</p>
                    <p className="font-medium">{user.section}</p>
                  </div>
                )}
                {user?.gpa && (
                  <div>
                    <p className="text-sm text-muted-foreground">GPA</p>
                    <p className="font-medium">{user.gpa}</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </>
    );
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

export default StudentProfile;