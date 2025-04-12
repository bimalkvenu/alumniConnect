import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Mail, Lock } from 'lucide-react';
import { ReactNode } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    email: string;
    password: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginModal = ({ 
  isOpen, 
  onClose, 
  formData, 
  onInputChange, 
  onSubmit 
}: LoginModalProps) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Welcome Back"
      onSubmit={onSubmit}
      submitText="Log In"
      size="sm"
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Mail className="h-5 w-5 text-gray-500" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={onInputChange}
            className="flex-1 bg-transparent focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Lock className="h-5 w-5 text-gray-500" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={onInputChange}
            className="flex-1 bg-transparent focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-phthalo focus:ring-phthalo border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <button
            type="button"
            className="text-sm font-medium text-phthalo hover:text-phthalo-dark"
          >
            Forgot password?
          </button>
        </div>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full justify-center gap-2"
        >
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
            <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd"/>
          </svg>
          Sign in with Google
        </Button>
      </form>
    </Modal>
  );
};