import { motion } from "framer-motion";
import { LightbulbIcon, WrenchIcon, MessageCircleIcon, BarChart3Icon, RefreshCcwIcon, SendIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const timelineSteps = [
  {
    icon: LightbulbIcon,
    title: "Identify Opportunity",
    description: "Start with real customer pain points and problems",
  },
  {
    icon: WrenchIcon,
    title: "Shape the Solution",
    description: "Define the vision, align cross-functional teams, and scope MVP for speed and clarity",
  },
  {
    icon: SendIcon,
    title: "Launch with Purpose",
    description: "Drive GTM readiness with aligned messaging, training, and internal enablement",
  },
  {
    icon: BarChart3Icon,
    title: "Measure What Matters",
    description: "Track adoption, usage, and performance to ensure impact matches intent",
  },
  {
    icon: RefreshCcwIcon,
    title: "Refine and Iterate",
    description: "Use feedback loops to prioritize improvements and guide roadmap evolution",
  },
  {
    icon: MessageCircleIcon,
    title: "Tell the Story",
    description: "Craft messaging that resonates — from engineers to executives",
  },
];

const ProductTimeline = () => {
  return (
    <div className="relative max-w-screen-lg mx-auto">
      <motion.h3
        className="text-2xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        How I Build Products
      </motion.h3>

      <div className="relative max-w-2xl mx-auto">
        {/* Glowing line connecting the steps */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-electric-blue via-electric-blue/30 to-transparent" />

        <div className="space-y-12">
          {timelineSteps.map((step, index) => (
            <motion.div
              key={step.title}
              className="relative pl-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="absolute left-0 p-2 rounded-full bg-background border border-electric-blue/20 shadow-lg shadow-electric-blue/5 group-hover:border-electric-blue/50 transition-colors duration-300">
                <step.icon className={cn(
                  "w-4 h-4",
                  "text-electric-blue hover:text-soft-orange transition-colors duration-300"
                )} />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductTimeline;
