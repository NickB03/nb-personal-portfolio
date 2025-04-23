
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/types/project";

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
  return (
    <section className="py-24 container mx-auto px-4">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="block group">
              <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/50">
                <CardHeader className="relative aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="flex items-center justify-between mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                    <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                  </CardTitle>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="font-medium">
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
    </section>
  );
};

export default ProjectSection;
