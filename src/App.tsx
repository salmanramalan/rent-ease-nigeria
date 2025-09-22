import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Properties from "./pages/Properties";
import AddProperty from "./pages/AddProperty";
import Tenants from "./pages/Tenants";
import AddTenant from "./pages/AddTenant";
import Billing from "./pages/Billing";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/properties" element={<ProtectedRoute><Properties /></ProtectedRoute>} />
              <Route path="/properties/add" element={<ProtectedRoute><AddProperty /></ProtectedRoute>} />
              <Route path="/tenants" element={<ProtectedRoute><Tenants /></ProtectedRoute>} />
              <Route path="/tenants/add" element={<ProtectedRoute><AddTenant /></ProtectedRoute>} />
              <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
              <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
