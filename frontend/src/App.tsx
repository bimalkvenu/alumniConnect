import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AlumniPortal from "./pages/AlumniPortal";
import AlumniProfile from "./pages/AlumniProfile";
import AIChat from "./pages/AIChat";
import StudentPortal from "./pages/StudentPortal";
import StudentProfile from "./pages/StudentProfile";
import Events from "./pages/Events";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"; // Add this import

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Protected Alumni Routes */}
          <Route path="/alumni-portal" element={
            <ProtectedRoute>
              <AlumniPortal />
            </ProtectedRoute>
          } />
          <Route path="/alumni-profile" element={
            <ProtectedRoute>
              <AlumniProfile />
            </ProtectedRoute>
          } />
          
          {/* Protected Student Routes */}
          <Route path="/student-portal" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentPortal />
            </ProtectedRoute>
          } />
          <Route path="/student-profile" element={
            <ProtectedRoute>
              <StudentProfile />
            </ProtectedRoute>
          } />
          
          {/* Public Routes */}
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/events" element={<Events />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;