import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LinkedinIcon } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const Navigation = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-electric-blue focus:text-white focus:rounded"
      >
        Skip to main content
      </a>

      <nav className="container max-w-screen-lg mx-auto flex items-center justify-between h-16 px-4">
        {/* Left side - Logo/Name */}
        <a href="/" className="text-lg font-semibold">
          Nick B.
        </a>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <a href="#projects" className="hover:text-electric-blue transition-colors">
            Projects
          </a>
          <a href="#about" className="hover:text-electric-blue transition-colors">
            About
          </a>
          <a href="#contact" className="hover:text-electric-blue transition-colors">
            Contact
          </a>
        </div>

        {/* Right side - Theme Toggle + CTA */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button className="bg-electric-blue hover:bg-electric-blue/90 text-white" asChild>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Let's Connect
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
