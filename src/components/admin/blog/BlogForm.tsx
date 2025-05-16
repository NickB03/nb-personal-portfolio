
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { toast } from "@/components/ui/sonner";

interface BlogFormProps {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  excerpt: string;
  setExcerpt: (excerpt: string) => void;
  coverImage: string;
  setCoverImage: (coverImage: string) => void;
  tags: string;
  setTags: (tags: string) => void;
}

const BlogForm: React.FC<BlogFormProps> = ({
  title,
  setTitle,
  content,
  setContent,
  excerpt,
  setExcerpt,
  coverImage,
  setCoverImage,
  tags,
  setTags,
}) => {
  // Handle tag input
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
  };

  // Parse tags for preview
  const tagArray = tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag);

  return (
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
  );
};

export default BlogForm;
