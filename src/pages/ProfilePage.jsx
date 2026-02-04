import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-dark mb-8">My Profile</h1>

        <div className="max-w-2xl">
          <Card>
            <div className="p-8">
              {/* Profile Header */}
              <div className="flex items-center space-x-6 mb-8 pb-8 border-b border-gray-200">
                <div className="w-24 h-24 bg-primary-blue rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-3xl">
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-dark">{user.firstName} {user.lastName}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-primary-blue text-white text-sm rounded-full">
                    {user.role}
                  </span>
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-4 mb-8">
                <div>
                  <label className="text-sm text-gray-500">Username</label>
                  <p className="text-lg font-semibold text-dark">{user.username}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="text-lg font-semibold text-dark">{user.email}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Phone Number</label>
                  <p className="text-lg font-semibold text-dark">{user.phoneNumber || 'Not provided'}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Account Type</label>
                  <p className="text-lg font-semibold text-dark">{user.role}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <Button variant="secondary" className="flex-1">
                  Edit Profile
                </Button>
                <Button variant="danger" onClick={handleLogout} className="flex-1">
                  Logout
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Card hover onClick={() => navigate('/my-tickets')}>
              <div className="p-6 text-center">
                <svg className="w-12 h-12 mx-auto text-primary-blue mb-3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                <h3 className="font-bold text-dark">My Tickets</h3>
              </div>
            </Card>

            <Card hover onClick={() => navigate('/events')}>
              <div className="p-6 text-center">
                <svg className="w-12 h-12 mx-auto text-primary-blue mb-3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="font-bold text-dark">Browse Events</h3>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
