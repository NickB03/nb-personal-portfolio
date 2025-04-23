
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProjectSection from "@/components/ProjectSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <ProjectSection />
    </div>
  );
};

export default Index;
