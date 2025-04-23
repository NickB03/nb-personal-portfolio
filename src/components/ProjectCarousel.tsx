
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const projects = [
  {
    title: "AnalystAI",
    description: "AI-powered financial analysis platform",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=400&q=80",
  },
  {
    title: "VANA",
    description: "Virtual Assistant for Network Administration",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&h=400&q=80",
  },
];

const ProjectCarousel = () => {
  return (
    <Carousel className="w-full max-w-xl mx-auto" opts={{ duration: 30, loop: true }}>
      <CarouselContent className="py-4">
        {projects.map((project, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div className="group glass-card rounded-xl p-6 hover:ring-2 ring-electric-blue/30 transition-all duration-300 hover:translate-y-[-4px]">
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gradient">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-electric-blue hover:text-soft-orange transition-colors duration-300 hover:bg-white/5" />
      <CarouselNext className="text-electric-blue hover:text-soft-orange transition-colors duration-300 hover:bg-white/5" />
    </Carousel>
  );
};

export default ProjectCarousel;
