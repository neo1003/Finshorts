import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const user = JSON.parse(currentUser);
        setIsLoggedIn(user.isAuthenticated);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 fixed top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 
            onClick={() => navigate("/")} 
            className="text-2xl font-bold text-primary cursor-pointer hover:opacity-90 transition-opacity"
          >
            FinShorts
          </h1>
        </div>
        <nav className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/market-analysis")}
            className="text-gray-600 hover:text-primary hover:bg-transparent transition-colors duration-200"
          >
            Market Analysis
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/news")}
            className="text-gray-600 hover:text-primary hover:bg-transparent transition-colors duration-200"
          >
            News
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/saved-articles")}
            className="text-gray-600 hover:text-primary hover:bg-transparent transition-colors duration-200"
          >
            Saved Articles
          </Button>
        </nav>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-gray-600 hover:text-primary hover:bg-transparent transition-colors duration-200"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate("/auth/login")}
                className="text-gray-600 hover:text-primary hover:bg-transparent transition-colors duration-200"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/auth/signup")}
                className="bg-primary text-white hover:bg-primary/90 transition-colors duration-200 px-6"
              >
                Join Free
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};