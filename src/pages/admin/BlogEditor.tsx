
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { blogService } from "@/services/blogService";
import { useAuth } from "@/hooks/useAuth";
import BlogForm from "@/components/admin/blog/BlogForm";
import BlogToolbar from "@/components/admin/blog/BlogToolbar";
import DeleteConfirmDialog from "@/components/admin/blog/DeleteConfirmDialog";
import Navigation from "@/components/Navigation";

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="container mx-auto max-w-screen-lg px-6 pt-24 pb-16">
        <BlogToolbar
          isEditing={isEditing}
          isSaving={isSaving}
          onSave={handleSave}
          onBack={() => navigate("/blog")}
          onDelete={() => setIsDeleteDialogOpen(true)}
        />

        <Card>
          <CardContent className="p-6">
            <BlogForm
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              excerpt={excerpt}
              setExcerpt={setExcerpt}
              coverImage={coverImage}
              setCoverImage={setCoverImage}
              tags={tags}
              setTags={setTags}
            />
          </CardContent>
        </Card>

        <DeleteConfirmDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
};

export default BlogEditor;
