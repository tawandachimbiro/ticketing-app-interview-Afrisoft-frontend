import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ROUTES } from '../../utils/constants';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { getTicketCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  const ticketCount = getTicketCount();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-red rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">ASA</span>
            </div>
            <span className="text-xl font-bold text-dark hidden sm:block">
              Africa Software Architects
            </span>
            <span className="text-xl font-bold text-dark sm:hidden">ASA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to={ROUTES.HOME} 
              className="text-gray-700 hover:text-primary-blue font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              to={ROUTES.EVENTS} 
              className="text-gray-700 hover:text-primary-blue font-medium transition-colors"
            >
              Events
            </Link>
            {isAuthenticated && (
              <Link 
                to={ROUTES.MY_TICKETS} 
                className="text-gray-700 hover:text-primary-blue font-medium transition-colors relative"
              >
                My Tickets
                {ticketCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {ticketCount}
                  </span>
                )}
              </Link>
            )}
            {isAdmin() && (
              <Link 
                to={ROUTES.ADMIN_DASHBOARD} 
                className="text-gray-700 hover:text-primary-blue font-medium transition-colors"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to={ROUTES.PROFILE}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-blue transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium">{user?.firstName}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-primary-red font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to={ROUTES.LOGIN}
                  className="text-primary-blue hover:text-blue-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to={ROUTES.SIGNUP}
                  className="bg-primary-red hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-primary-blue"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <Link 
              to={ROUTES.HOME}
              className="block py-2 text-gray-700 hover:text-primary-blue font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to={ROUTES.EVENTS}
              className="block py-2 text-gray-700 hover:text-primary-blue font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            {isAuthenticated && (
              <>
                <Link 
                  to={ROUTES.MY_TICKETS}
                  className="block py-2 text-gray-700 hover:text-primary-blue font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Tickets {ticketCount > 0 && `(${ticketCount})`}
                </Link>
                {isAdmin() && (
                  <Link 
                    to={ROUTES.ADMIN_DASHBOARD}
                    className="block py-2 text-gray-700 hover:text-primary-blue font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <Link 
                  to={ROUTES.PROFILE}
                  className="block py-2 text-gray-700 hover:text-primary-blue font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-primary-red hover:text-red-600 font-medium"
                >
                  Logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link 
                  to={ROUTES.LOGIN}
                  className="block py-2 text-gray-700 hover:text-primary-blue font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to={ROUTES.SIGNUP}
                  className="block py-2 text-gray-700 hover:text-primary-blue font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
