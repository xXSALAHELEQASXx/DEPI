
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LinkifyLogo from '../ui/LinkifyLogo';

const SplashScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-gradient overflow-hidden">
      <div className="absolute inset-0 bg-purple-wire bg-[length:400%_100%] animate-wire-animation"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-8 animate-fade-in">
          <LinkifyLogo className="h-24 w-auto" />
        </div>
        
        <div className="mt-8 animate-pulse-purple">
          <div className="w-8 h-8 border-4 border-r-transparent border-linkify-300 rounded-full animate-spinner"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
