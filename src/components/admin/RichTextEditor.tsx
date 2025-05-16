
import React, { useState, useEffect, useRef } from "react";
import { toast } from "@/components/ui/sonner";
import EditorToolbar from "./editor/EditorToolbar";
import LinkDialog from "./editor/LinkDialog";
import ImageDialog from "./editor/ImageDialog";
import { useEditorSelection } from "@/hooks/useEditorSelection";

interface RichTextEditorProps {
  initialContent: string;
  onChange: (content: string) => void;
}

const RichTextEditor = ({ initialContent, onChange }: RichTextEditorProps) => {
  const [editorContent, setEditorContent] = useState(initialContent);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  
  // Use the custom selection hook
  const { saveSelection, restoreSelection } = useEditorSelection(editorRef);

  // Initialize the editor with content
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent;
      
      // Remove any potential bidirectional override characters
      const content = editorRef.current.innerHTML;
      const cleanedContent = content.replace(/[\u202A-\u202E\u2066-\u2069]/g, '');
      if (cleanedContent !== content) {
        editorRef.current.innerHTML = cleanedContent;
        onChange(cleanedContent);
      }
    }
  }, [initialContent, onChange]);

  // Handle editor content changes
  const handleInput = () => {
    if (editorRef.current) {
      // Remove any bidirectional override characters that might be inserted
      const content = editorRef.current.innerHTML;
      const cleanedContent = content.replace(/[\u202A-\u202E\u2066-\u2069]/g, '');
      
      if (cleanedContent !== content) {
        // Only update if we actually cleaned something
        editorRef.current.innerHTML = cleanedContent;
      }
      
      setEditorContent(cleanedContent);
      onChange(cleanedContent);
    }
  };

  // Formatting commands
  const formatText = (command: string, value?: string) => {
    saveSelection();
    document.execCommand(command, false, value);
    handleInput();
  };

  // Handle link insertion
  const handleLinkInsert = () => {
    if (!linkUrl.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }

    restoreSelection();
    const linkHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="text-electric-blue hover:underline">${linkText || linkUrl}</a>`;
    document.execCommand("insertHTML", false, linkHtml);
    handleInput();
    setIsLinkDialogOpen(false);
    setLinkUrl("");
    setLinkText("");
  };

  // Handle image insertion
  const handleImageInsert = () => {
    if (!imageUrl.trim()) {
      toast.error("Please enter a valid image URL");
      return;
    }

    restoreSelection();
    const imageHtml = `<img src="${imageUrl}" alt="${imageAlt}" class="max-w-full h-auto my-4 rounded-md" />`;
    document.execCommand("insertHTML", false, imageHtml);
    handleInput();
    setIsImageDialogOpen(false);
    setImageUrl("");
    setImageAlt("");
  };

  // Open link dialog and save selection
  const handleOpenLinkDialog = () => {
    saveSelection();
    setIsLinkDialogOpen(true);
  };

  // Open image dialog and save selection
  const handleOpenImageDialog = () => {
    saveSelection();
    setIsImageDialogOpen(true);
  };

  return (
    <div className="border rounded-md overflow-hidden bg-background">
      <EditorToolbar 
        onFormatText={formatText}
        onOpenLinkDialog={handleOpenLinkDialog}
        onOpenImageDialog={handleOpenImageDialog}
      />

      <div
        ref={editorRef}
        contentEditable
        dir="ltr" 
        className="p-4 min-h-[300px] focus:outline-none prose prose-sm dark:prose-invert max-w-none"
        style={{ direction: "ltr", unicodeBidi: "isolate" }}
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: initialContent }}
      ></div>

      <LinkDialog
        isOpen={isLinkDialogOpen}
        onOpenChange={setIsLinkDialogOpen}
        linkUrl={linkUrl}
        linkText={linkText}
        onLinkUrlChange={setLinkUrl}
        onLinkTextChange={setLinkText}
        onInsert={handleLinkInsert}
      />

      <ImageDialog
        isOpen={isImageDialogOpen}
        onOpenChange={setIsImageDialogOpen}
        imageUrl={imageUrl}
        imageAlt={imageAlt}
        onImageUrlChange={setImageUrl}
        onImageAltChange={setImageAlt}
        onInsert={handleImageInsert}
      />
    </div>
  );
};

export default RichTextEditor;
