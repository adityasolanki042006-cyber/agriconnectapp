import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-green-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/')} className="btn-success">
          <Home className="w-5 h-5 mr-2" />
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
