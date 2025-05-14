
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { BlogPost } from "@/types/blog";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { PlusSquare, PenIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { blogService } from "@/services/blogService";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setPosts(blogService.getPosts());
    document.title = "Blog - Nick Bohmer";
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="container mx-auto max-w-screen-lg px-6 pt-24 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-superhuman-blue dark:text-electric-blue">
            Blog
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64"
            />
            {isAuthenticated && (
              <Button
                className="bg-electric-blue hover:bg-electric-blue/90 text-white dark:bg-electric-blue dark:hover:bg-electric-blue/90 flex items-center gap-2"
                onClick={() => navigate("/admin/blog/new")}
              >
                <PlusSquare className="w-4 h-4" />
                New Post
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="relative">
                <BlogCard post={post} />
                {isAuthenticated && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 rounded-full bg-white/70 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(`/admin/blog/edit/${post.id}`);
                    }}
                  >
                    <PenIcon className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-3 text-center py-16">
              <p className="text-xl text-gray-500 dark:text-gray-400">
                {searchQuery
                  ? "No posts match your search."
                  : "No blog posts yet. Check back soon!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
