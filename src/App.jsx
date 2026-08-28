import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import DashboardLayout from './components/layout/DashboardLayout'

import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Notifications from './pages/Notifications'

import CustomerDashboard from './pages/customer/CustomerDashboard'
import Services from './pages/customer/Services'
import ProviderDetails from './pages/customer/ProviderDetails'
import CreateRequest from './pages/customer/CreateRequest'
import MyBookings from './pages/customer/MyBookings'
import CustomerProfile from './pages/customer/CustomerProfile'

import ProviderDashboard from './pages/provider/ProviderDashboard'
import MyJobs from './pages/provider/MyJobs'
import Earnings from './pages/provider/Earnings'
import Reviews from './pages/provider/Reviews'
import ProviderProfile from './pages/provider/ProviderProfile'

import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminProviders from './pages/admin/AdminProviders'
import AdminRequests from './pages/admin/AdminRequests'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import AdminComplaints from './pages/admin/AdminComplaints'

function RequireAuth({ children, role }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (role && user.role !== role) return <Navigate to={`/${user.role}/dashboard`} replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/services" element={<Landing />} />
      <Route path="/how-it-works" element={<Landing />} />
      <Route path="/providers" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/customer" element={<RequireAuth role="customer"><DashboardLayout /></RequireAuth>}>
        <Route index element={<Navigate to="/customer/dashboard" replace />} />
        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="services" element={<Services />} />
        <Route path="providers/:id" element={<ProviderDetails />} />
        <Route path="create-request" element={<CreateRequest />} />
        <Route path="bookings" element={<MyBookings />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<CustomerProfile />} />
      </Route>

      <Route path="/provider" element={<RequireAuth role="provider"><DashboardLayout /></RequireAuth>}>
        <Route index element={<Navigate to="/provider/dashboard" replace />} />
        <Route path="dashboard" element={<ProviderDashboard />} />
        <Route path="jobs" element={<MyJobs />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<ProviderProfile />} />
      </Route>

      <Route path="/admin" element={<RequireAuth role="admin"><DashboardLayout /></RequireAuth>}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="providers" element={<AdminProviders />} />
        <Route path="requests" element={<AdminRequests />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="complaints" element={<AdminComplaints />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  )
}
