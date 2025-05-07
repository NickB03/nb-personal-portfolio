import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;

  // Toggle between light and dark themes
  const toggleTheme = () => {
    // If current theme is system, we need to determine what to switch to
    if (theme === "system") {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(systemPrefersDark ? "light" : "dark");
    } else {
      // Otherwise just toggle between light and dark
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  // Determine which icon to show based on current applied theme
  const showDarkIcon = () => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return theme === "dark";
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hover:bg-transparent"
      onClick={toggleTheme}
      aria-label={`Switch to ${showDarkIcon() ? "light" : "dark"} theme`}
    >
      {showDarkIcon() ? (
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Sun className="h-5 w-5 text-electric-blue hover:text-soft-orange transition-colors" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Moon className="h-5 w-5 text-electric-blue hover:text-soft-orange transition-colors" />
        </motion.div>
      )}
    </Button>
  );
}
