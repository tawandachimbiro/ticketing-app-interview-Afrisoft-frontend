import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import Card from '../components/common/Card';
import { ROUTES } from '../utils/constants';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-blue to-blue-400 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <Card>
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-red rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">ASA</span>
              </div>
              <h2 className="text-3xl font-bold text-dark mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to your account to continue</p>
            </div>

            <LoginForm />

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to={ROUTES.SIGNUP} className="text-primary-blue hover:underline font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
