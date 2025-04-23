
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProjectSection from "@/components/ProjectSection";
import About from "@/components/About";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <ProjectSection />
      <About />
    </div>
  );
};

export default Index;
