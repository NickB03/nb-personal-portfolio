
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <section id="projects" className="scroll-mt-16">
        {/* Projects section content will be added here later */}
      </section>
    </div>
  );
};

export default Index;
