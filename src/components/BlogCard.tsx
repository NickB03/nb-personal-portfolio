
import { BlogPost } from "@/types/blog";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

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
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white/50 dark:bg-navy-dark/50 backdrop-blur-sm border border-white/20 dark:border-white/10">
      {post.coverImage && (
        <div className="aspect-video relative overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <h3 className="text-xl font-semibold line-clamp-2 text-superhuman-blue dark:text-electric-blue">
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
          <Badge key={tag} variant="secondary" className="dark:bg-white/10">
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
