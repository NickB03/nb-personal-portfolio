
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
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-electric-blue focus:text-white focus:rounded">
        Skip to main content
      </a>

      <nav className="container max-w-screen-lg mx-auto flex items-center justify-between h-16 px-4">
        <div className="w-8"></div>

        <div className="hidden md:flex space-x-8">
          <a href="#projects" className="text-foreground/80 hover:text-electric-blue transition-colors dark:text-white/80">
            Projects
          </a>
          <a href="#about" className="text-foreground/80 hover:text-electric-blue transition-colors dark:text-white/80">
            About
          </a>
          <a href="#contact" className="text-foreground/80 hover:text-electric-blue transition-colors dark:text-white/80">
            Contact
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button className="bg-electric-blue hover:bg-electric-blue/90 text-white dark:glass-card dark:hover:bg-electric-blue/20 dark:hover:ring-2 dark:ring-electric-blue/50 transition-all duration-300" asChild>
            <a
              href="https://www.linkedin.com/in/nickbohmer/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
              aria-label="Connect with Nick Bohmer on LinkedIn"
            >
              Let's Connect
              <LinkedinIcon className="h-4 w-4 transition-colors hover:text-soft-orange" />
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
