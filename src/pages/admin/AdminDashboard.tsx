
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusSquare, FileText, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { blogService } from "@/services/blogService";
import Navigation from "@/components/Navigation";

const AdminDashboard = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const posts = blogService.getPosts();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login", { state: { from: "/admin" } });
      return;
    }
    
    document.title = "Admin Dashboard - Nick Bohmer";
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="container mx-auto max-w-screen-lg px-6 pt-24 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-superhuman-blue dark:text-electric-blue">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
            <Button
              className="bg-electric-blue hover:bg-electric-blue/90 text-white dark:bg-electric-blue dark:hover:bg-electric-blue/90 flex items-center gap-2"
              onClick={() => navigate("/admin/blog/new")}
            >
              <PlusSquare className="w-4 h-4" />
              New Post
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Blog Management</CardTitle>
            <CardDescription>
              You have {posts.length} blog post{posts.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Recent Posts</span>
                <Button 
                  variant="ghost" 
                  className="text-sm" 
                  onClick={() => navigate("/blog")}
                >
                  View All
                </Button>
              </div>
              {posts.slice(0, 5).map((post) => (
                <div
                  key={post.id}
                  className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{post.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                  >
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
