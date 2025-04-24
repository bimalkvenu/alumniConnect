import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MenuIcon, X, GraduationCap, Home, MessageCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { JoinModal } from '@/components/modals/join-modal';
import { LoginModal } from '@/components/modals/login-modal';
import api from '@/api';
import { Loader2 } from 'lucide-react';
import StudentPortal from '@/pages/StudentPortal';

interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'student' | 'mentor';
  registrationNumber?: string;
  year?: string;
  section?: string;
  program?: string;
}

const NavigationBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showMentorForm, setShowMentorForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form states
  const [studentFormData, setStudentFormData] = useState({
    fullName: '',
    registrationNumber: '',
    email: '',
    password: '',
    year: '',
    section: '',
    program: ''
  });

  const [mentorFormData, setMentorFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    graduationYear: '',
    program: '',
    currentPosition: '',
    company: ''
  });

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRoleSelect = (role: 'student' | 'mentor') => {
    setErrors({});
    if (role === 'student') {
      setShowStudentForm(true);
      setShowMentorForm(false);
    } else {
      setShowStudentForm(false);
      setShowMentorForm(true);
    }
  };

  const validateStudentForm = () => {
    const newErrors: Record<string, string> = {};
    if (!studentFormData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!studentFormData.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required';
    if (!studentFormData.email.trim()) newErrors.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(studentFormData.email)) newErrors.email = 'Invalid email format';
    if (!studentFormData.password || studentFormData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!studentFormData.year) newErrors.year = 'Year is required';
    if (!studentFormData.section) newErrors.section = 'Section is required';
    if (!studentFormData.program) newErrors.program = 'Program is required';
    return newErrors;
  };

  const handleStudentInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStudentFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStudentSubmit = async () => {
    const formErrors = validateStudentForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post('/auth/register', {
        name: studentFormData.fullName,
        registrationNumber: studentFormData.registrationNumber,
        email: studentFormData.email,
        password: studentFormData.password,
        year: String(studentFormData.year),
        section: studentFormData.section,
        program: studentFormData.program,
        role: 'student'
      });

      // Modify the handleStudentSubmit success handler
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        setIsJoinModalOpen(false);
        navigate('/student-portal'); // Redirect to student portal
      }
    
    } catch (error) {
      console.error('Registration error:', error);
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response) {
        errorMessage = error.response.data.error || errorMessage;
        
        if (error.response.status === 400 && 
            (error.response.data.error.includes('email') || 
             error.response.data.error.includes('registration'))) {
          setErrors({
            ...errors,
            email: error.response.data.error.includes('email') ? error.response.data.error : '',
            registrationNumber: error.response.data.error.includes('registration') ? error.response.data.error : ''
          });
          return;
        }
      }
      
      setErrors({ form: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', loginFormData);
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);
      setLoginFormData({ email: "", password: "" });
      setIsLoginModalOpen(false);
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        form: error.response?.data?.error || "Login failed. Please try again."
      });
    }
  };
  
  const handleFormInputChange = (formType: 'student' | 'mentor', e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (formType === 'student') {
      setStudentFormData(prev => ({ ...prev, [name]: value }));
      // Clear error for this field if it exists
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    } else {
      setMentorFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleFormSubmit = (formType: 'student' | 'mentor') => {
    if (formType === 'student') {
      handleStudentSubmit();
    } else {
      // Handle mentor submission if needed
      console.log('Mentor form submission');
    }
  };

  const handleGoogleAuth = () => {
    console.log('Google authentication initiated');
    // Implement Google auth
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/'); // Redirect to home
  };

  const resetForms = () => {
    setStudentFormData({
      fullName: '',
      registrationNumber: '',
      email: '',
      password: '',
      year: '',
      section: '',
      program: ''
    });
    setMentorFormData({
      fullName: '',
      email: '',
      password: '',
      graduationYear: '',
      program: '',
      currentPosition: '',
      company: ''
    });
    setErrors({});
    setShowStudentForm(false);
    setShowMentorForm(false);
  };

  const closeJoinModal = () => {
    setIsJoinModalOpen(false);
    resetForms();
  };

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-phthalo-light/50 py-3' : 'bg-transparent py-5'
      )}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-phthalo" />
            <span className="font-semibold text-xl text-phthalo">AlumniConnect</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-sm font-medium transition-colors hover:text-phthalo flex items-center gap-1"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link 
              to="/ai-chat" 
              className="text-sm font-medium transition-colors hover:text-phthalo flex items-center gap-1"
            >
              <MessageCircle className="h-4 w-4" />
              AI Assistant
            </Link>
            <Link 
              to="/events" 
              className="text-sm font-medium transition-colors hover:text-phthalo flex items-center gap-1"
            >
              <Calendar className="h-4 w-4" />
              Events
            </Link>
          </nav>

          {/* Action buttons */}
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-phthalo font-medium">Hi, {user.fullName.split(" ")[0]}</span>
              <Button 
                variant="outline" 
                className="button-transition focus-ring text-red-600 border-red-300 hover:text-red-800"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  setUser(null);
                  window.location.reload(); // or use navigate('/')
                }}
              >
                Logout
              </Button>
            </div>
        ) : (
          <>
              <Button 
                variant="outline" 
                onClick={() => setIsLoginModalOpen(true)}
                className="button-transition button-hover focus-ring border-phthalo-medium/50 text-phthalo hover:text-phthalo-dark"
              >
                Login
              </Button>
              <Button 
                onClick={() => setIsJoinModalOpen(true)}
                className="button-transition button-hover focus-ring bg-phthalo hover:bg-phthalo-dark"
              >
              Join Now
              </Button>
            </>
          )}

          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6 text-phthalo" /> : <MenuIcon className="h-6 w-6 text-phthalo" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-phthalo-light/50 animate-fade-in">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link 
                to="/" 
                className="py-2 text-base font-medium transition-colors hover:text-phthalo flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link 
                to="/ai-chat" 
                className="py-2 text-base font-medium transition-colors hover:text-phthalo flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MessageCircle className="h-4 w-4" />
                AI Assistant
              </Link>
              <Link 
                to="/events" 
                className="py-2 text-base font-medium transition-colors hover:text-phthalo flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Calendar className="h-4 w-4" />
                Events
              </Link>
              <div className="pt-2 flex flex-col space-y-3">
                {user ? (
                  <>
                    <span className="text-sm text-phthalo font-medium pl-2">Hi, {user.fullName.split(" ")[0]}</span>
                    <Button 
                      variant="outline"
                      className="w-full justify-center button-transition focus-ring text-red-600 border-red-300 hover:text-red-800"
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        setUser(null);
                        window.location.reload();
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline"
                      className="w-full justify-center button-transition focus-ring border-phthalo-medium/50 text-phthalo hover:text-phthalo-dark"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsLoginModalOpen(true);
                      }}
                    >
                      Login
                    </Button>
                    <Button 
                      className="w-full justify-center button-transition focus-ring bg-phthalo hover:bg-phthalo-dark"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsJoinModalOpen(true);
                      }}
                    >
                      Join Now
                    </Button>
                  </>
                  )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Modal components */}
      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={closeJoinModal}
        onRoleSelect={handleRoleSelect}
        showStudentForm={showStudentForm}
        showMentorForm={showMentorForm}
        studentFormData={studentFormData}
        mentorFormData={mentorFormData}
        onFormInputChange={handleFormInputChange}
        onFormSubmit={handleFormSubmit}
        onGoogleAuth={handleGoogleAuth}
        errors={errors}
        isSubmitting={isSubmitting}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        formData={loginFormData}
        onInputChange={handleLoginInputChange}
        onSubmit={handleLoginSubmit}
      />
    </>
  );
};

export default NavigationBar;