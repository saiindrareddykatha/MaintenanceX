import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import DashboardLayout from './components/common/DashboardLayout';
import { ROLES } from './utils/constants';

// Pages
import Login from './pages/Login';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import Machines from './pages/admin/Machines';
import Notifications from './pages/admin/Notifications';
import Maintenance from './pages/admin/Maintenance';
import History from './pages/admin/History';

// Engineer Pages
import EngineerDashboard from './pages/engineer/EngineerDashboard';
import EngineerTasks from './pages/engineer/Tasks';
import EngineerCalendar from './pages/engineer/Calendar';
import EngineerHistory from './pages/engineer/History';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/machines" element={<Machines />} />
              <Route path="/admin/notifications" element={<Notifications />} />
              <Route path="/admin/maintenance" element={<Maintenance />} />
              <Route path="/admin/history" element={<History />} />
            </Route>
          </Route>

          {/* Engineer Routes */}
          <Route element={<ProtectedRoute allowedRoles={[ROLES.ENGINEER]} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/engineer/dashboard" element={<EngineerDashboard />} />
              <Route path="/engineer/tasks" element={<EngineerTasks />} />
              <Route path="/engineer/calendar" element={<EngineerCalendar />} />
              <Route path="/engineer/history" element={<EngineerHistory />} />
            </Route>
          </Route>

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
