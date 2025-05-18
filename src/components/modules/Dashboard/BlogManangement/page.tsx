/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import axios from "axios";
import RitchTextEditor from "@/components/ui/rich-text-editor";

const BlogManagement = () => {
	const [blogs, setBlogs] = useState<any[]>([]);
	const [isEditing, setIsEditing] = useState(false);
	const [editingBlog, setEditingBlog] = useState<any>(null);
	const [formData, setFormData] = useState<any>({
		title: "",
		brief: "",
		content: {},
		cover: "",
		publishedDate: "",
		readTime: "",
	});
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	// Fetch all blogs
	useEffect(() => {
		(async () => {
			const res = await fetch("http://localhost:5000/api/blog");
			const json = await res.json();
			setBlogs(json.data);
		})();
	}, []);

	// Image upload handler
	const handleImageUpload = async (e: any) => {
		const file = e.target.files[0];
		if (!file) return;
		setLoading(true);
		const data = new FormData();
		data.append("file", file);
		data.append("upload_preset", "WheelDeal");
		try {
			const res = await axios.post(
				"https://api.cloudinary.com/v1_1/dxm5tpw0l/image/upload",
				data
			);
			setFormData((prev: any) => ({ ...prev, cover: res.data.secure_url }));
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	// Open dialog for create or edit
	const openDialog = (blog: any = null) => {
		if (blog) {
			setIsEditing(true);
			setEditingBlog(blog);
			setFormData({
				title: blog.title,
				brief: blog.brief,
				content: blog.content,
				cover: blog.cover || "",
				publishedDate: blog.publishedDate?.slice(0, 10) || "",
				readTime: blog.readTime?.toString() || "",
			});
		} else {
			setIsEditing(false);
			setEditingBlog(null);
			setFormData({
				title: "",
				brief: "",
				content: {},
				cover: "",
				publishedDate: "",
				readTime: "",
			});
		}
		setIsDialogOpen(true);
	};

	// Save or update
	const handleSave = async () => {
		const url = isEditing
			? `http://localhost:5000/api/blog/${editingBlog._id}`
			: "http://localhost:5000/api/blog";
		const method = isEditing ? "PUT" : "POST";
		const payload = {
			title: formData.title,
			brief: formData.brief,
			content: formData.content,
			cover: formData.cover,
			publishedDate: formData.publishedDate,
			readTime: formData.readTime,
		};

		console.log(payload);
		const res = await fetch(url, {
			method,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});
		const json = await res.json();
		if (isEditing)
			setBlogs((prev) =>
				prev.map((b) => (b._id === json.data._id ? json.data : b))
			);
		else setBlogs((prev) => [...prev, json.data]);

		setIsDialogOpen(false);
	};

	// Delete handler
	const handleDelete = async (id: string) => {
		await fetch(`http://localhost:5000/api/blog/${id}`, { method: "DELETE" });
		setBlogs((prev) => prev.filter((b) => b._id !== id));
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-xl font-semibold">Blogs</h1>
				<Button onClick={() => openDialog()}>Create Blog</Button>
			</div>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="p-6 max-w-4xl">
					<Tabs defaultValue="basic">
						<TabsList className="mb-4">
							<TabsTrigger value="basic">Basic Info</TabsTrigger>
							<TabsTrigger value="content">Content</TabsTrigger>
						</TabsList>

						<TabsContent value="basic" className="space-y-4">
							<div>
								<label className="block mb-1">Title</label>
								<Input
									name="title"
									value={formData.title}
									onChange={(e) =>
										setFormData((f: any) => ({ ...f, title: e.target.value }))
									}
									placeholder="Enter title"
								/>
							</div>
							<div>
								<label className="block mb-1">Brief (excerpt)</label>
								<Input
									name="brief"
									value={formData.brief}
									onChange={(e) =>
										setFormData((f: any) => ({ ...f, brief: e.target.value }))
									}
									placeholder="Enter brief"
								/>
							</div>
							<div>
								<label className="block mb-1">Published Date</label>
								<input
									type="date"
									className="border rounded px-2 py-1"
									value={formData.publishedDate}
									onChange={(e) =>
										setFormData((f: any) => ({
											...f,
											publishedDate: e.target.value,
										}))
									}
								/>
							</div>
							<div>
								<label className="block mb-1">Read Time (min)</label>
								<input
									type="number"
									className="border rounded px-2 py-1"
									value={formData.readTime}
									onChange={(e) =>
										setFormData((f: any) => ({
											...f,
											readTime: e.target.value,
										}))
									}
									placeholder="e.g. 5"
								/>
							</div>
							<div>
								<label className="block mb-1">Cover Image</label>
								<input type="file" onChange={handleImageUpload} />
								{loading && <p>Uploading...</p>}
								{formData.cover && (
									<img
										src={formData.cover}
										alt="Cover"
										className="w-32 h-32 mt-2 object-cover"
									/>
								)}
							</div>
						</TabsContent>

						<TabsContent value="content">
							<label className="block mb-1">Main Content</label>
							<RitchTextEditor
								content={formData.content}
								onChange={(json) =>
									setFormData((f: any) => ({ ...f, content: json }))
								}
							/>
						</TabsContent>
					</Tabs>

					<div className="flex justify-end space-x-2 mt-4">
						<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleSave}>
							{isEditing ? "Update" : "Save"}
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Title</TableHead>
						<TableHead>Brief</TableHead>
						<TableHead>Content</TableHead>
						<TableHead>Published</TableHead>
						<TableHead>Read Time</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{blogs.map((b) => (
						<TableRow key={b._id}>
							<TableCell>{b.title}</TableCell>
							<TableCell>{b.brief}</TableCell>
							<TableCell>
								<div
									className="prose max-w-none overflow-auto"
									style={{ maxHeight: "150px" }}
									dangerouslySetInnerHTML={{ __html: b.content }}
								/>
							</TableCell>
							<TableCell>
								{new Date(b.publishedDate).toLocaleDateString()}
							</TableCell>
							<TableCell>{b.readTime} min</TableCell>
							<TableCell className="flex space-x-2">
								<Button
									size="icon"
									variant="outline"
									onClick={() => openDialog(b)}
								>
									<Pencil className="w-4 h-4" />
								</Button>
								<Button
									size="icon"
									variant="destructive"
									onClick={() => handleDelete(b._id)}
								>
									<Trash className="w-4 h-4" />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default BlogManagement;
