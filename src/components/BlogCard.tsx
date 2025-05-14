
import { BlogPost } from "@/types/blog";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="flex flex-col h-full overflow-hidden bg-white/50 dark:bg-navy-dark/50 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:shadow-xl transition-all duration-300 group">
        {post.coverImage && (
          <div className="aspect-video relative overflow-hidden">
            <div className="absolute inset-0 bg-electric-blue/0 group-hover:bg-electric-blue/10 transition-colors duration-300 z-10 rounded-t-lg"></div>
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <CardHeader className="pb-2">
          <h3 className="text-xl font-semibold line-clamp-2 text-superhuman-blue dark:text-electric-blue group-hover:text-superhuman-purple dark:group-hover:text-superhuman-light transition-colors duration-300">
            <Link to={`/blog/${post.id}`} className="hover:underline">
              {post.title}
            </Link>
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formattedDate} • {post.author}
          </p>
        </CardHeader>
        <CardContent className="py-2 flex-grow">
          <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="pt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge 
              key={tag} 
              className="bg-electric-blue/10 text-superhuman-blue hover:bg-electric-blue/20 dark:bg-electric-blue/20 dark:text-electric-blue dark:hover:bg-electric-blue/30 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default BlogCard;
