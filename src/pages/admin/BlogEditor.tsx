import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, Save, Trash } from "lucide-react";
import { blogService } from "@/services/blogService";
import { BlogPost } from "@/types/blog";
import Navigation from "@/components/Navigation";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { useAuth } from "@/hooks/useAuth";
import Badge from "@/components/ui/badge";

const BlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = id !== "new";
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [tags, setTags] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate("/admin/login", { state: { from: `/admin/blog/${id ? 'edit/' + id : 'new'}` } });
      return;
    }

    // Load post data if editing
    if (isEditing && id) {
      const post = blogService.getPostById(id);
      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setExcerpt(post.excerpt);
        setCoverImage(post.coverImage || "");
        setTags(post.tags.join(", "));
      } else {
        toast.error("Blog post not found");
        navigate("/blog");
      }
    }

    // Set page title
    document.title = isEditing ? "Edit Blog Post - Nick Bohmer" : "New Blog Post - Nick Bohmer";
  }, [id, isEditing, isAuthenticated, navigate]);

  const handleSave = () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!content.trim()) {
      toast.error("Please enter some content");
      return;
    }

    setIsSaving(true);

    try {
      const tagArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      const postData = {
        title,
        content,
        excerpt: excerpt || content.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
        author: "Nick Bohmer",
        coverImage,
        tags: tagArray,
      };

      if (isEditing && id) {
        blogService.updatePost(id, postData);
        toast.success("Blog post updated successfully");
      } else {
        blogService.createPost(postData);
        toast.success("Blog post created successfully");
      }

      navigate("/blog");
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("Error saving blog post");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    if (isEditing && id) {
      try {
        blogService.deletePost(id);
        toast.success("Blog post deleted successfully");
        setIsDeleteDialogOpen(false);
        navigate("/blog");
      } catch (error) {
        console.error("Error deleting post:", error);
        toast.error("Error deleting blog post");
      }
    }
  };

  // New function to handle tag input
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
  };

  // Preview current tags
  const tagArray = tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="container mx-auto max-w-screen-lg px-6 pt-24 pb-16">
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => navigate("/blog")}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Button>
          <div className="flex gap-2">
            {isEditing && (
              <Button
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <Trash className="w-4 h-4" />
                Delete
              </Button>
            )}
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-electric-blue hover:bg-electric-blue/90 text-white dark:bg-electric-blue dark:hover:bg-electric-blue/90 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Post title"
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt (optional)</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary of your post (will be auto-generated if left empty)"
                  className="h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image URL (optional)</Label>
                <Input
                  id="coverImage"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                {coverImage && (
                  <div className="mt-2 rounded-md overflow-hidden h-40 border border-electric-blue/30">
                    <img
                      src={coverImage}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                      onError={() => toast.error("Invalid image URL")}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={handleTagsChange}
                  placeholder="Web Development, Design, Technology"
                />
                
                {/* Tag preview */}
                {tagArray.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    <p className="text-sm text-gray-500 mr-2 self-center">Preview:</p>
                    {tagArray.map((tag) => (
                      <Badge 
                        key={tag}
                        className="bg-electric-blue/10 text-superhuman-blue dark:bg-electric-blue/20 dark:text-electric-blue"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <RichTextEditor
                  initialContent={content}
                  onChange={setContent}
                />
              </div>
            </form>
          </CardContent>
        </Card>

        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                blog post.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default BlogEditor;
