
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/types/blog";
import BlogCard from "@/components/BlogCard";
import { useNavigate } from "react-router-dom";
import { blogService } from "@/services/blogService";
import { motion } from "framer-motion";

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load blog posts from the service
    setPosts(blogService.getPosts().slice(0, 3)); // Only show 3 latest posts
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="blog" className="py-20 px-6 container mx-auto max-w-screen-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-superhuman-blue dark:text-electric-blue">
          Latest Blog Posts
        </h2>
        <p className="text-lg text-center mb-12 max-w-2xl mx-auto">
          Thoughts, insights, and updates about my work, projects and the tech industry.
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {posts.length > 0 ? (
          posts.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <BlogCard post={post} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-3 text-center py-10">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              No blog posts yet. Check back soon!
            </p>
          </div>
        )}
      </motion.div>
      
      <motion.div 
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Button 
          className="bg-electric-blue hover:bg-electric-blue/90 text-white dark:bg-electric-blue dark:hover:bg-electric-blue/90 transition-all duration-300" 
          onClick={() => navigate('/blog')}
        >
          View All Posts
        </Button>
      </motion.div>
    </section>
  );
};

export default BlogSection;
