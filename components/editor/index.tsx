"use client";

import React, { useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./editor-tool";

type Props = {
  editable?: boolean;
  initialContent: any[];
  setTextEditor: React.Dispatch<React.SetStateAction<EditorJS | null>>;
};

const Editor: React.FC<Props> = ({ editable, initialContent, setTextEditor }) => {
  useEffect(() => {
    const editorInstance = new EditorJS({
      holder: "textEditor",
      data: {
        blocks: initialContent,
      },
      placeholder: "Write your product description",
      tools: tools,
    });
    editorInstance.isReady;
    setTextEditor(editorInstance);
    return () => {
      if (editorInstance && typeof editorInstance.destroy === 'function') {
        editorInstance.destroy();
      }
    };
  }, [initialContent, setTextEditor]);

  return <div id="textEditor"></div>;
};

export default Editor;
