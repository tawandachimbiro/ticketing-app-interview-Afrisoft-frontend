import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import PurchaseTicketPage from './pages/PurchaseTicketPage';
import MyTicketsPage from './pages/MyTicketsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCreateEvent from './pages/admin/AdminCreateEvent';
import AdminEditEvent from './pages/admin/AdminEditEvent';

import { ROUTES } from './utils/constants';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            
            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.EVENTS} element={<EventsPage />} />
                <Route path={ROUTES.EVENT_DETAILS} element={<EventDetailsPage />} />
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.SIGNUP} element={<SignupPage />} />

                {/* Protected Routes */}
                <Route 
                  path={ROUTES.PURCHASE_TICKET} 
                  element={
                    <ProtectedRoute>
                      <PurchaseTicketPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path={ROUTES.MY_TICKETS} 
                  element={
                    <ProtectedRoute>
                      <MyTicketsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path={ROUTES.PROFILE} 
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } 
                />

                {/* Admin Routes */}
                <Route 
                  path={ROUTES.ADMIN_DASHBOARD} 
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path={ROUTES.ADMIN_CREATE_EVENT} 
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminCreateEvent />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path={ROUTES.ADMIN_EDIT_EVENT} 
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminEditEvent />
                    </ProtectedRoute>
                  } 
                />

                {/* 404 Page */}
                <Route 
                  path="*" 
                  element={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-6xl font-bold text-dark mb-4">404</h1>
                        <p className="text-xl text-gray-600 mb-8">Page not found</p>
                        <a href="/" className="bg-primary-red hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold">
                          Go Home
                        </a>
                      </div>
                    </div>
                  } 
                />
              </Routes>
            </main>

            <Footer />
          </div>

          {/* Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
