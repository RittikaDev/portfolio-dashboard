"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface BlogEditorProps {
	initialContent: string;
	onUpdate: (content: string) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({
	initialContent,
	onUpdate,
}) => {
	const editor = useEditor({
		extensions: [StarterKit],
		content: initialContent,
		onUpdate: ({ editor }) => {
			onUpdate(editor.getHTML());
		},
	});

	// IF INITIALCONTENT CHANGES EXTERNALLY, UPDATE EDITOR CONTENT
	useEffect(() => {
		if (editor && initialContent !== editor.getHTML()) {
			editor.commands.setContent(initialContent, false);
		}
	}, [initialContent, editor]);

	return (
		<EditorContent
			editor={editor}
			className="border rounded p-2 min-h-[300px]"
		/>
	);
};

export default BlogEditor;
