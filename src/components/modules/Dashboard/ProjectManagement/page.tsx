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
import Image from "next/image";
import toast from "react-hot-toast";
import envConfig from "@/config/env.config";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import LoadingPage from "@/app/loading";
type ProjectProps = {
	token: string;
};

const DashboardProjectTable = ({ token }: ProjectProps) => {
	const [projects, setProjects] = useState<any[]>([]);
	const [isEditing, setIsEditing] = useState(false);
	const [loading, setLoading] = useState(false);
	const [editingProject, setEditingProject] = useState<any>(null);
	const [formData, setFormData] = useState<any>({});
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	useEffect(() => {
		const fetchProjects = async () => {
			setLoading(true);
			try {
				const res = await fetch(
					// "https://portfolio-v2-alpha-woad.vercel.app/api/projects/featured"
					`${envConfig.baseApi}/api/projects/featured`
				);
				const { data } = await res.json();
				// console.log(data);
				setProjects(data);
			} catch (err) {
				console.error("Failed to fetch blogs", err);
			} finally {
				setLoading(false);
			}
		};
		fetchProjects();
	}, []);

	const handleImageUpload = async (event: any) => {
		const file = event.target.files[0];
		if (file) {
			setLoading(true);
			const formData = new FormData();
			formData.append("file", file);
			formData.append("upload_preset", "WheelDeal");

			try {
				const res = await axios.post(
					`https://api.cloudinary.com/v1_1/dxm5tpw0l/image/upload`,
					formData
				);
				const imageUrl = res.data.secure_url;
				setFormData((prev: any) => ({ ...prev, cover: imageUrl }));
				setLoading(false);
			} catch (err) {
				console.error("Error uploading image", err);
				setLoading(false);
			}
		}
	};

	const handleCreate = async () => {
		const res = await fetch(
			"https://portfolio-v2-alpha-woad.vercel.app/api/projects",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(formData),
			}
		);
		const result = await res.json();
		// console.log(result);
		if (!result.success) toast.error(result.message);
		else {
			toast.success(result.message);
			setProjects((prev) => [...prev, result.data]);
			setFormData({});
			setIsDialogOpen(false);
		}
	};

	const handleEdit = (project: any) => {
		setIsEditing(true);
		setEditingProject(project);
		setFormData(project);
		setIsDialogOpen(true);
	};

	const handleSave = async () => {
		if (isEditing) {
			const res = await fetch(
				// `https://portfolio-v2-alpha-woad.vercel.app/api/projects/${editingProject._id}`,
				`${envConfig.baseApi}/api/projects/${editingProject._id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(formData),
				}
			);
			const result = await res.json();
			setProjects((prev) =>
				prev.map((proj) => (proj._id === result.data._id ? result.data : proj))
			);
		} else handleCreate();

		setIsEditing(false);
		setEditingProject(null);
		setIsDialogOpen(false);
	};

	const handleDelete = async (projectId: string) => {
		// const res = await fetch(
		// 	`https://portfolio-v2-alpha-woad.vercel.app/api/projects/${projectId}`,
		// 	{
		// 		method: "DELETE",
		// 		headers: { Authorization: `Bearer ${token}` },
		// 	}
		// );
		// if (res.ok) {
		// 	toast.success("Deleted succesfully");
		// 	setProjects((prev) => prev.filter((proj) => proj._id !== projectId));
		// }

		confirmAlert({
			title: "Confirm Deletion",
			message: "Are you sure you want to delete this project?",
			buttons: [
				{
					label: "Yes",
					onClick: async () => {
						const res = await fetch(
							`https://portfolio-v2-alpha-woad.vercel.app/api/projects/${projectId}`,
							{
								method: "DELETE",
								headers: { Authorization: `Bearer ${token}` },
							}
						);
						if (res.ok) {
							toast.success("Deleted succesfully");
							setProjects((prev) =>
								prev.filter((proj) => proj._id !== projectId)
							);
						}
					},
				},
				{
					label: "No",
				},
			],
		});
	};

	// const handleChange = (e: any) => {
	// 	setFormData({ ...formData, [e.target.name]: e.target.value });
	// };

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		// IF THE FIELD BELONGS TO THE FRONTEND OR BACKEND OBJECT, UPDATE ACCORDINGLY
		if (name.startsWith("frontend.") || name.startsWith("backend.")) {
			const [parent, key] = name.split("."); // 'FRONTEND' OR 'BACKEND' AND THE ACTUAL KEY
			setFormData((prev: any) => ({
				...prev,
				[parent]: {
					...prev[parent],
					[key]: value,
				},
			}));
		} else setFormData({ ...formData, [name]: value });
	};

	return (
		<div className="p-6 ">
			<div className="flex justify-between items-center mb-4 ">
				<h1 className=" font-semibold">Projects</h1>
				<Button
					onClick={() => {
						setIsEditing(false);
						setFormData({});
						setIsDialogOpen(true);
					}}
					className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg"
				>
					Create Project
				</Button>
			</div>

			{/* SHARED DIALOG FOR CREATE & EDIT */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="p-6">
					<Tabs defaultValue="basic">
						<TabsList className="flex space-x-2 mb-4">
							<TabsTrigger value="basic">Basic Info</TabsTrigger>
							<TabsTrigger value="frontend">Frontend</TabsTrigger>
							<TabsTrigger value="backend">Backend</TabsTrigger>
						</TabsList>
						<TabsContent value="basic" className="space-y-3">
							<Input
								name="title"
								value={formData.title || ""}
								onChange={handleChange}
								placeholder="Title"
							/>
							<Input
								name="slug"
								value={formData.slug || ""}
								onChange={handleChange}
								placeholder="Slug"
							/>
							<Input
								name="brief"
								value={formData.brief || ""}
								onChange={handleChange}
								placeholder="Brief"
							/>
							<input
								type="file"
								accept="image/*"
								onChange={handleImageUpload}
							/>
							{loading && <p>Uploading...</p>}
							{/* {formData.cover && (
                <img src={formData.cover} alt="Cover" className="w-32 h-32" />
              )} */}
							<Input
								name="images"
								value={formData.images || ""}
								onChange={handleChange}
								placeholder="Images (comma-separated)"
							/>
							<Input
								name="type"
								value={formData.type || ""}
								onChange={handleChange}
								placeholder="Type"
							/>
						</TabsContent>
						<TabsContent value="frontend" className="space-y-3">
							<Input
								name="frontend.technologies"
								value={formData.frontend?.technologies || ""}
								onChange={handleChange}
								placeholder="Frontend Technologies (comma-separated)"
							/>
							<Input
								name="frontend.deploymentLink"
								value={formData.frontend?.deploymentLink || ""}
								onChange={handleChange}
								placeholder="Frontend Deployment Link"
							/>
							<Input
								name="frontend.github"
								value={formData.frontend?.github || ""}
								onChange={handleChange}
								placeholder="Frontend GitHub"
							/>
						</TabsContent>
						<TabsContent value="backend" className="space-y-3">
							<Input
								name="backend.technologies"
								value={formData.backend?.technologies || ""}
								onChange={handleChange}
								placeholder="Backend Technologies (comma-separated)"
							/>
							<Input
								name="backend.deploymentLink"
								value={formData.backend?.deploymentLink || ""}
								onChange={handleChange}
								placeholder="Backend Deployment Link"
							/>
							<Input
								name="backend.github"
								value={formData.backend?.github || ""}
								onChange={handleChange}
								placeholder="Backend GitHub"
							/>
						</TabsContent>
					</Tabs>
					<div className="flex justify-end space-x-2 mt-4">
						<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
							Cancel
						</Button>
						<Button
							disabled={!formData.title || !formData.brief}
							onClick={handleSave}
							className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg"
						>
							{isEditing ? "Update" : "Save"}
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			{loading ? (
				<LoadingPage />
			) : (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead>Image</TableHead>
							<TableHead>Live Link</TableHead>
							<TableHead>Brief</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{projects.map((project) => (
							<TableRow key={project?._id}>
								<TableCell>{project?.title}</TableCell>
								<TableCell>
									<Image
										src={project?.cover}
										alt="project image"
										width="100"
										height="100"
									/>
								</TableCell>
								<TableCell>
									{" "}
									<a
										href={project?.frontend?.deploymentLink}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
									>
										{project?.frontend?.deploymentLink
											? "View Project"
											: "No Link"}
									</a>
								</TableCell>
								<TableCell>{project?.brief}</TableCell>
								<TableCell className="flex space-x-2">
									<Button
										size="icon"
										variant="outline"
										onClick={() => handleEdit(project)}
									>
										<Pencil className="w-4 h-4" />
									</Button>
									<Button
										size="icon"
										variant="destructive"
										onClick={() => handleDelete(project?._id)}
									>
										<Trash className="w-4 h-4" />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</div>
	);
};

export default DashboardProjectTable;
