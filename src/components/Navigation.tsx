
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
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-superhuman-purple focus:text-white focus:rounded">
        Skip to main content
      </a>

      <nav className="container max-w-screen-lg mx-auto flex items-center justify-between h-16 px-4">
        <div className="w-8"></div>

        <div className="hidden md:flex space-x-8">
          <a href="#projects" className="font-medium text-superhuman-blue hover:text-superhuman-purple transition-colors dark:text-white/90 dark:hover:text-superhuman-light">
            Projects
          </a>
          <a href="#about" className="font-medium text-superhuman-blue hover:text-superhuman-purple transition-colors dark:text-white/90 dark:hover:text-superhuman-light">
            About
          </a>
          <a href="#contact" className="font-medium text-superhuman-blue hover:text-superhuman-purple transition-colors dark:text-white/90 dark:hover:text-superhuman-light">
            Contact
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button className="superhuman-button dark:glass-card dark:hover:bg-superhuman-purple/30" asChild>
            <a
              href="https://www.linkedin.com/in/nickbohmer/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
              aria-label="Connect with Nick Bohmer on LinkedIn"
            >
              Let's Connect
              <LinkedinIcon className="h-4 w-4 transition-colors hover:text-white" />
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
