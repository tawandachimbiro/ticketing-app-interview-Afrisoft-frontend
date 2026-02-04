import { Link } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';
import Card from '../components/common/Card';
import { ROUTES } from '../utils/constants';

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-blue to-blue-400 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <Card>
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-red rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">ASA</span>
              </div>
              <h2 className="text-3xl font-bold text-dark mb-2">Create Account</h2>
              <p className="text-gray-600">Join us and start booking amazing events</p>
            </div>

            <SignupForm />

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to={ROUTES.LOGIN} className="text-primary-blue hover:underline font-semibold">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
