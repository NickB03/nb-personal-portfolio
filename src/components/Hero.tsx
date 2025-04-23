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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent hover:from-electric-blue hover:to-electric-blue/70 transition-all duration-300">
            Nick Bohmer
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground">
            AI Innovation Through a Product Lens
          </p>
          <p className="text-lg text-muted-foreground/80">
            Building the future of AI-powered products with a focus on user experience and business impact.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-electric-blue hover:bg-electric-blue/90 text-white"
              asChild
            >
              <a href="#projects">View Projects</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-electric-blue text-electric-blue hover:bg-electric-blue/10"
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
            <a href="#projects" aria-label="Scroll to projects">
              <ChevronDown className="h-8 w-8 text-electric-blue hover:text-soft-orange transition-colors" />
            </a>
          </motion.div>
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
      </div>
    </section>
  );
};

export default Hero;
