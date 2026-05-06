import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { SocketProvider } from "@/contexts/SocketContext";

// Pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import About from "./pages/About";
import BloodInfo from "./pages/BloodInfo";
import FindBlood from "./pages/FindBlood";
import DonorDashboard from "./pages/DonorDashboard";
import ReceiverDashboard from "./pages/ReceiverDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route wrapper
function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

// App Routes component (needs to be inside AuthProvider)
function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/about" element={<About />} />
      <Route path="/blood-info" element={<BloodInfo />} />

      {/* Protected Routes - Donor */}
      <Route
        path="/donor/dashboard"
        element={
          <ProtectedRoute allowedRoles={['donor']}>
            <DonorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/donor/profile"
        element={
          <ProtectedRoute allowedRoles={['donor']}>
            <DonorDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes - Receiver */}
      <Route
        path="/receiver/dashboard"
        element={
          <ProtectedRoute allowedRoles={['receiver']}>
            <ReceiverDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/find-blood"
        element={
          <ProtectedRoute allowedRoles={['receiver']}>
            <FindBlood />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <SocketProvider>
            <AppRoutes />
          </SocketProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
