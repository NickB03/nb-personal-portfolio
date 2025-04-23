
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LinkedinIcon } from "lucide-react";
import ProductTimeline from "./ProductTimeline";

const About = () => {
  return (
    <section id="about" className="py-24 container mx-auto px-4 scroll-mt-16">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        About Nick
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12 items-start mb-24">
        {/* Avatar Column */}
        <motion.div
          className="flex justify-center md:justify-start"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative group">
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#4F9DF7] to-[#4F9DF7]/50 opacity-75 blur-lg group-hover:opacity-100 transition duration-300"></div>
                  <Avatar className="relative w-48 h-48 border-2 border-[#4F9DF7]/20 hover:border-[#4F9DF7]/50 transition duration-300">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
                      alt="Nick's profile"
                      className="object-cover"
                    />
                    <AvatarFallback>NB</AvatarFallback>
                  </Avatar>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ships MVPs before the coffee brews ☕</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>

        {/* Bio Column */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold">Product Manager at AT&T Business</h3>
          <p className="text-muted-foreground">
            Leading SD-WAN & SASE initiatives while exploring the intersection of AI and
            product development. Focused on learning through doing, I've successfully
            deployed multiple MVP SaaS applications built with various programming
            languages and running in Google Cloud Platform.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="group hover:border-[#4F9DF7]/50 hover:shadow-lg hover:shadow-[#4F9DF7]/20"
            asChild
          >
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Nick's LinkedIn profile"
              className="flex items-center gap-2"
            >
              View LinkedIn
              <LinkedinIcon className="w-4 h-4 group-hover:animate-pulse" />
            </a>
          </Button>
        </motion.div>
      </div>

      <ProductTimeline />
    </section>
  );
};

export default About;

