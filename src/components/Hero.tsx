
import { Button } from "@/components/ui/button";
import { LinkedinIcon, ChevronDown } from "lucide-react";
import ProjectCarousel from "./ProjectCarousel";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen pt-16 flex items-center relative scroll-mt-16" id="main-content">
      <div className="container max-w-screen-lg mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient">
            Nick Bohmer
          </h1>
          <p className="text-2xl md:text-3xl text-foreground dark:text-white/90">
            AI Innovation Through a Product Lens
          </p>
          <p className="text-lg text-foreground/80 dark:text-white/80">
            Building the future of AI-powered products with a focus on user experience and business impact.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="superhuman-button hover:opacity-90"
              asChild
            >
              <a href="#projects">View Projects</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-superhuman-blue text-superhuman-blue hover:bg-superhuman-blue/10 hover:ring-2 ring-superhuman-blue/50 transition-all duration-300 dark:glass-card"
              asChild
            >
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Message Me on LinkedIn
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProjectCarousel />
        </motion.div>

        {/* Scroll Cue */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <a href="#projects" className="block p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border hover:ring-2 ring-superhuman-blue/30 transition-all duration-300 dark:glass-card">
              <ChevronDown className="h-6 w-6 text-superhuman-blue hover:text-superhuman-purple transition-colors" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
