import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/types/project";
import { useIsMobile } from "@/hooks/use-mobile";

const projects: Project[] = [
  {
    title: "AnalystAI",
    description: "AI-powered financial analysis platform enabling real-time market insights and automated reporting through natural language processing.",
    tags: ["GPT-4", "Next.js", "Supabase"],
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    link: "#",
  },
  {
    title: "VANA",
    description: "Virtual Assistant for Network Administration that streamlines infrastructure management through intelligent automation and predictive maintenance.",
    tags: ["Machine Learning", "React", "Python"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    link: "#",
  },
];

const ProjectSection = () => {
  const isMobile = useIsMobile();

  return (
    <section id="projects" className="py-24 bg-background/50 scroll-mt-16">
      <div className="container max-w-screen-lg mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 relative">
          {isMobile && (
            <motion.div
              className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm text-electric-blue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span>Swipe to see more</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          )}
          
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block group focus-visible:outline-none"
                aria-label={`View ${project.title} project details`}
              >
                <Card className="h-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-electric-blue/20 hover:ring-2 hover:ring-electric-blue/50 focus-visible:ring-2 focus-visible:ring-electric-blue/50">
                  <CardHeader className="relative aspect-[16/9] overflow-hidden rounded-t-lg p-0">
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="flex items-center justify-between mb-3 group-hover:text-electric-blue transition-colors duration-300 ease-in-out">
                      {project.title}
                      <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                    </CardTitle>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="text-xs font-medium px-2.5 py-0.5 bg-card hover:bg-soft-orange/10 border border-soft-orange/30"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
