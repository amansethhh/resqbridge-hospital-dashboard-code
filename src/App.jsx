import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/layout/DashboardLayout';
// Auth pages
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
// App pages
import Dashboard from '@/pages/Dashboard';
import StatusReadiness from '@/pages/StatusReadiness';
import IncomingEmergencies from '@/pages/IncomingEmergencies';
import EmergencyQueue from '@/pages/EmergencyQueue';
import EmergencyDetail from '@/pages/EmergencyDetail';
import LiveTracking from '@/pages/LiveTracking';
import PreArrivalPrep from '@/pages/PreArrivalPrep';
import AmbulanceArrived from '@/pages/AmbulanceArrived';
import PatientReception from '@/pages/PatientReception';
import CaseInfo from '@/pages/CaseInfo';
import Handover from '@/pages/Handover';
import HandoverCompleted from '@/pages/HandoverCompleted';
import Resources from '@/pages/Resources';
import Departments from '@/pages/Departments';
import HistoryPage from '@/pages/HistoryPage';
import HistoryDetail from '@/pages/HistoryDetail';
import Notifications from '@/pages/Notifications';
import Reports from '@/pages/Reports';
import Settings from '@/pages/Settings';
import Cases from '@/pages/Cases';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/status" element={<StatusReadiness />} />
          <Route path="/emergencies" element={<EmergencyQueue />} />
          <Route path="/emergencies/:id" element={<EmergencyDetail />} />
          <Route path="/emergencies/:id/pre-arrival" element={<PreArrivalPrep />} />
          <Route path="/emergencies/:id/reception" element={<PatientReception />} />
          <Route path="/emergencies/:id/case" element={<CaseInfo />} />
          <Route path="/emergencies/:id/handover" element={<Handover />} />
          <Route path="/emergencies/:id/handover-complete" element={<HandoverCompleted />} />
          <Route path="/incoming" element={<IncomingEmergencies />} />
          <Route path="/ambulances" element={<LiveTracking />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/arrived" element={<AmbulanceArrived />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/history/:id" element={<HistoryDetail />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App