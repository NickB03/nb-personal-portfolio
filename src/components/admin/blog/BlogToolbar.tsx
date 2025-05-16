
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Trash } from "lucide-react";

interface BlogToolbarProps {
  isEditing: boolean;
  isSaving: boolean;
  onSave: () => void;
  onBack: () => void;
  onDelete: () => void;
}

const BlogToolbar: React.FC<BlogToolbarProps> = ({
  isEditing,
  isSaving,
  onSave,
  onBack,
  onDelete,
}) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={onBack}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </Button>
      <div className="flex gap-2">
        {isEditing && (
          <Button
            variant="destructive"
            onClick={onDelete}
            className="flex items-center gap-2"
          >
            <Trash className="w-4 h-4" />
            Delete
          </Button>
        )}
        <Button
          onClick={onSave}
          disabled={isSaving}
          className="bg-electric-blue hover:bg-electric-blue/90 text-white dark:bg-electric-blue dark:hover:bg-electric-blue/90 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default BlogToolbar;
