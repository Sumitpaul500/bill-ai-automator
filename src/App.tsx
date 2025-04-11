
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ScanPage from "./pages/ScanPage";
import UploadPage from "./pages/UploadPage";
import BillsPage from "./pages/BillsPage";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes - Wrapped in AppLayout */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/bills" element={<BillsPage />} />
            {/* Additional routes can be added here */}
            <Route path="/analytics" element={<div className="p-4">Analytics page (coming soon)</div>} />
            <Route path="/reports" element={<div className="p-4">Reports page (coming soon)</div>} />
            <Route path="/settings" element={<div className="p-4">Settings page (coming soon)</div>} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
