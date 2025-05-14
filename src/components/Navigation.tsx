
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LinkedinIcon } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Check if we're on the home page
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render link based on current location
  const renderLink = (href: string, label: string) => {
    if (isHomePage) {
      return (
        <a href={href} className="font-medium text-superhuman-blue hover:text-superhuman-purple transition-colors dark:text-electric-blue dark:hover:text-superhuman-light">
          {label}
        </a>
      );
    } else {
      return (
        <Link to={`/${href.substring(1)}`} className="font-medium text-superhuman-blue hover:text-superhuman-purple transition-colors dark:text-electric-blue dark:hover:text-superhuman-light">
          {label}
        </Link>
      );
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-superhuman-purple focus:text-white focus:rounded">
        Skip to main content
      </a>

      {/* Invisible login button */}
      <Link 
        to="/admin/login" 
        className="absolute top-0 left-0 w-8 h-8 opacity-5 hover:opacity-20 transition-opacity z-50" 
        aria-label="Admin login"
      >
        <span className="sr-only">Admin Login</span>
      </Link>

      <nav className="container max-w-screen-lg mx-auto flex items-center justify-between h-16 px-4">
        <div className="w-8"></div>

        <div className="hidden md:flex space-x-8">
          {renderLink("#projects", "Projects")}
          {isHomePage ? (
            renderLink("#blog", "Blog")
          ) : (
            <Link to="/blog" className="font-medium text-superhuman-blue hover:text-superhuman-purple transition-colors dark:text-electric-blue dark:hover:text-superhuman-light">
              Blog
            </Link>
          )}
          {renderLink("#about", "About")}
          {renderLink("#contact", "Contact")}
          {isAuthenticated && (
            <Link to="/admin" className="font-medium text-superhuman-blue hover:text-superhuman-purple transition-colors dark:text-electric-blue dark:hover:text-superhuman-light">
              Admin
            </Link>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button 
            className="bg-electric-blue hover:bg-electric-blue/90 text-white dark:bg-electric-blue dark:hover:bg-electric-blue/90 transition-all duration-300" 
            asChild
          >
            <a
              href="https://www.linkedin.com/in/nickbohmer/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
              aria-label="Connect with Nick Bohmer on LinkedIn"
            >
              Let's Connect
              <LinkedinIcon className="h-4 w-4 text-white" />
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
