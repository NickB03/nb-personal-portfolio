
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
    image: "/placeholder.svg",
  },
  {
    title: "VANA",
    description: "Virtual Assistant for Network Administration",
    image: "/placeholder.svg",
  },
];

const ProjectCarousel = () => {
  return (
    <Carousel className="w-full max-w-xl mx-auto">
      <CarouselContent>
        {projects.map((project, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px]">
                <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ProjectCarousel;
