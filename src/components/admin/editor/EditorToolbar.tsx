
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

interface EditorToolbarProps {
  onFormatText: (command: string, value?: string) => void;
  onOpenLinkDialog: () => void;
  onOpenImageDialog: () => void;
}

const EditorToolbar = ({ 
  onFormatText, 
  onOpenLinkDialog, 
  onOpenImageDialog 
}: EditorToolbarProps) => {
  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-muted/40">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onFormatText("bold")}
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onFormatText("italic")}
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onFormatText("formatBlock", "<h1>")}
        title="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onFormatText("formatBlock", "<h2>")}
        title="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onFormatText("formatBlock", "<h3>")}
        title="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-1" />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onFormatText("insertUnorderedList")}
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onFormatText("insertOrderedList")}
        title="Numbered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-1" />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onFormatText("justifyLeft")}
        title="Align Left"
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onFormatText("justifyCenter")}
        title="Align Center"
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onFormatText("justifyRight")}
        title="Align Right"
      >
        <AlignRight className="h-4 w-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-1" />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onOpenLinkDialog}
        title="Insert Link"
      >
        <LinkIcon className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onOpenImageDialog}
        title="Insert Image"
      >
        <ImageIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default EditorToolbar;
