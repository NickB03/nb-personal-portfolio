
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BlogPost as BlogPostType } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { blogService } from "@/services/blogService";
import Navigation from "@/components/Navigation";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const blogPost = blogService.getPostById(id);
    if (blogPost) {
      setPost(blogPost);
      document.title = `${blogPost.title} - Nick Bohmer`;
    }
    setLoading(false);
  }, [id]);

  const formattedDate = post?.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-electric-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="container mx-auto max-w-screen-lg px-6 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-8">The blog post you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/blog")} className="bg-electric-blue dark:bg-electric-blue">
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="container mx-auto max-w-screen-lg px-6 pt-24 pb-16">
        <Button
          variant="ghost"
          className="mb-8 flex items-center gap-2 hover:bg-electric-blue/10"
          onClick={() => navigate("/blog")}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Button>

        {post.coverImage && (
          <div className="w-full aspect-video mb-8 overflow-hidden rounded-lg">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-superhuman-blue dark:text-electric-blue">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="text-gray-600 dark:text-gray-400">
            {formattedDate} • {post.author}
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="dark:bg-white/10">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div 
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-superhuman-blue dark:prose-headings:text-electric-blue prose-a:text-electric-blue prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
};

export default BlogPost;
