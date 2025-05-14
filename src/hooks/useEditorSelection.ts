
import { useCallback, useState, MutableRefObject } from "react";

interface Selection {
  start: number;
  end: number;
}

export const useEditorSelection = (editorRef: MutableRefObject<HTMLDivElement | null>) => {
  const [selection, setSelection] = useState<Selection | null>(null);

  const saveSelection = useCallback(() => {
    if (!editorRef.current) return;
    
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(editorRef.current);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      const start = preSelectionRange.toString().length;

      setSelection({
        start,
        end: start + range.toString().length,
      });
    }
  }, [editorRef]);

  const restoreSelection = useCallback(() => {
    if (!selection || !editorRef.current) return;
    
    const range = document.createRange();
    const sel = window.getSelection();
    
    // This algorithm iterates through all nodes to find the position
    let charIndex = 0;
    let nodeStack: Node[] = [editorRef.current];
    let foundStart = false;
    let foundEnd = false;
    let startNode: Node | null = null;
    let endNode: Node | null = null;
    let startOffset = 0;
    let endOffset = 0;

    // Find the start and end positions by iterating through the DOM tree
    while (!foundEnd && nodeStack.length > 0) {
      const node = nodeStack.pop()!;
      
      if (node.nodeType === Node.TEXT_NODE) {
        const textLength = node.textContent?.length || 0;
        const nextCharIndex = charIndex + textLength;
        
        // Check if this text node contains the selection start
        if (!foundStart && selection.start >= charIndex && selection.start <= nextCharIndex) {
          startNode = node;
          startOffset = selection.start - charIndex;
          foundStart = true;
        }
        
        // Check if this text node contains the selection end
        if (!foundEnd && selection.end >= charIndex && selection.end <= nextCharIndex) {
          endNode = node;
          endOffset = selection.end - charIndex;
          foundEnd = true;
        }
        
        charIndex = nextCharIndex;
      } else {
        // Add child nodes to the stack in reverse order to process them in the correct order
        const childNodes = Array.from(node.childNodes).reverse();
        nodeStack.push(...childNodes);
      }
    }

    // Set the range if both start and end positions were found
    if (startNode && endNode) {
      try {
        range.setStart(startNode, startOffset);
        range.setEnd(endNode, endOffset);
        
        if (sel) {
          sel.removeAllRanges();
          sel.addRange(range);
        }
      } catch (error) {
        console.error("Error restoring selection:", error);
      }
    }
  }, [selection, editorRef]);

  return {
    selection,
    saveSelection,
    restoreSelection,
  };
};
