import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CommandCentre from "./pages/CommandCentre";
import DataAnonymisation from "./pages/DataAnonymisation";
import DocumentSummarisation from "./pages/DocumentSummarisation";
import CompletenessClassification from "./pages/CompletenessClassification";
import DocumentComparison from "./pages/DocumentComparison";
import SAEReports from "./pages/SAEReports";
import PortalIntegration from "./pages/PortalIntegration";
import ApprovedDrugs from "./pages/ApprovedDrugs";
import DataSources from "./pages/DataSources";
import { HelpDocs } from "./pages/PlaceholderPages";
import InspectionReports from "./pages/InspectionReports";
import AuditTrail from "./pages/AuditTrail";
import SettingsPage from "./pages/SettingsPage";
import UserManagement from "./pages/UserManagement";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><CommandCentre /></ProtectedRoute>} />
          <Route path="/anonymisation" element={<ProtectedRoute><DataAnonymisation /></ProtectedRoute>} />
          <Route path="/summarisation" element={<ProtectedRoute><DocumentSummarisation /></ProtectedRoute>} />
          <Route path="/completeness" element={<ProtectedRoute><CompletenessClassification /></ProtectedRoute>} />
          <Route path="/comparison" element={<ProtectedRoute><DocumentComparison /></ProtectedRoute>} />
          <Route path="/sae-reports" element={<ProtectedRoute><SAEReports /></ProtectedRoute>} />
          <Route path="/portal-integration" element={<ProtectedRoute><PortalIntegration /></ProtectedRoute>} />
          <Route path="/data-sources" element={<ProtectedRoute><DataSources /></ProtectedRoute>} />
          <Route path="/approved-drugs" element={<ProtectedRoute><ApprovedDrugs /></ProtectedRoute>} />
          <Route path="/inspection-reports" element={<ProtectedRoute><InspectionReports /></ProtectedRoute>} />
          <Route path="/audit-trail" element={<ProtectedRoute><AuditTrail /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute><HelpDocs /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
