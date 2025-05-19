"use client";

import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import {
	Edit2,
	Trash2,
	Calendar,
	MapPin,
	Clipboard,
	Save,
	PlusCircle,
} from "lucide-react";
import ShinyButton from "../ui/shiny-button";
import envConfig from "@/config/env.config";
import toast from "react-hot-toast";
import LoadingPage from "@/app/loading";

interface Experience {
	_id?: string;
	title: string;
	location: string;
	date: string;
	startDate: string;
	description: string;
}

type ExpProps = {
	token: string;
};

export default function Experience({ token }: ExpProps) {
	const [experiences, setExperiences] = useState<Experience[]>([]);
	const [form, setForm] = useState<Experience>({
		title: "",
		location: "",
		date: "",
		startDate: "",
		description: "",
	});
	const [editingId, setEditingId] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const fetchExperiences = async () => {
		setLoading(true);
		try {
			// const res = await fetch("http://localhost:5000/api/experience");
			const res = await fetch(`${envConfig.baseApi}/api/experience` as string);
			const data = await res.json();
			setExperiences(data.data);
		} catch (err) {
			console.error("Failed to fetch blogs", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchExperiences();
	}, []);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// const url = editingId
		// 	? `http://localhost:5000/api/experience/${editingId}`
		// 	: "http://localhost:5000/api/experience";
		const url = editingId
			? `${envConfig.baseApi}/api/experience/${editingId}`
			: `${envConfig.baseApi}/api/experience`;
		const method = editingId ? "PUT" : "POST";

		const res = await fetch(url, {
			method,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(form),
		});

		if (res.ok) {
			setForm({
				title: "",
				location: "",
				date: "",
				startDate: "",
				description: "",
			});
			setEditingId(null);
			fetchExperiences();

			if (editingId) toast.success("Experience updated successfully");
			else toast.success("New experience added successfully");
		}
	};

	const handleEdit = (exp: Experience) => {
		setForm({
			...exp,
			startDate: new Date(exp.startDate).toISOString().split("T")[0],
		});
		setEditingId(exp._id || null);
	};

	const handleDelete = async (id: string) => {
		confirmAlert({
			title: "Confirm Deletion",
			message: "Are you sure you want to delete this experience?",
			buttons: [
				{
					label: "Yes",
					onClick: async () => {
						const res = await fetch(
							`${envConfig.baseApi}/api/experience/${id}`,
							{
								method: "DELETE",
								headers: { Authorization: `Bearer ${token}` },
							}
						);
						if (res.ok) {
							fetchExperiences();

							// Reset form if deleted experience was being edited
							if (id === editingId) {
								setForm({
									title: "",
									location: "",
									date: "",
									startDate: "",
									description: "",
								});
								setEditingId(null);
							}
						}
					},
				},
				{
					label: "No",
				},
			],
		});
	};

	return (
		<div className="p-6 max-w-7xl mx-auto">
			<h1 className="text-2xl font-bold mb-6 text-center">Manage Experience</h1>
			{loading ? (
				<LoadingPage />
			) : (
				<div className="flex flex-col md:flex-row gap-8">
					{/* Form Container */}
					<form
						onSubmit={handleSubmit}
						className="md:w-80 bg-white p-6 rounded-lg shadow space-y-4 flex-shrink-0"
					>
						<div className="flex items-center space-x-2">
							<Clipboard className="w-5 h-5 text-gray-500" />
							<input
								name="title"
								value={form.title}
								onChange={handleChange}
								placeholder="Title"
								required
								className="flex-grow border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
							/>
						</div>
						<div className="flex items-center space-x-2">
							<MapPin className="w-5 h-5 text-gray-500" />
							<input
								name="location"
								value={form.location}
								onChange={handleChange}
								placeholder="Location"
								required
								className="flex-grow border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
							/>
						</div>
						<div className="flex items-center space-x-2">
							<Calendar className="w-5 h-5 text-gray-500" />
							<input
								name="date"
								value={form.date}
								onChange={handleChange}
								placeholder="Date"
								required
								className="flex-grow border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
							/>
						</div>
						<div className="flex items-center space-x-2">
							<Calendar className="w-5 h-5 text-gray-500" />
							<input
								type="date"
								name="startDate"
								value={form.startDate}
								onChange={handleChange}
								required
								className="flex-grow border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
							/>
						</div>
						<div className="flex items-start space-x-2">
							<Clipboard className="w-5 h-5 mt-1 text-gray-500" />
							<textarea
								name="description"
								value={form.description}
								onChange={handleChange}
								placeholder="Description"
								required
								rows={4}
								className="flex-grow border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
							></textarea>
						</div>
						<button type="submit" className="flex items-center justify-center">
							{editingId ? (
								<>
									<ShinyButton>
										<span className="flex items-center">
											<Save className="w-5 h-5 mr-2" />
											Update Experience
										</span>
									</ShinyButton>
								</>
							) : (
								<>
									<ShinyButton>
										<span className="flex items-center">
											<PlusCircle className="w-5 h-5 mr-2" />
											Create Experience
										</span>
									</ShinyButton>
								</>
							)}
						</button>
					</form>

					{/* Experiences List */}
					<ul className="flex-grow space-y-4 max-h-[600px] overflow-y-auto">
						{experiences.map((exp) => (
							<li
								key={exp._id}
								className="border rounded-lg p-4 shadow bg-white hover:shadow-lg transition-shadow"
							>
								<h2 className="text-xl font-semibold mb-2">{exp.title}</h2>
								<p className="text-gray-700">
									<strong>Location:</strong> {exp.location}
								</p>
								<p className="text-gray-700">
									<strong>Date:</strong> {exp.date}
								</p>
								<p className="text-gray-700">
									<strong>Start:</strong>{" "}
									{new Date(exp.startDate).toLocaleDateString()}
								</p>
								<p className="mt-2 text-gray-600">{exp.description}</p>
								<div className="flex space-x-4 mt-3">
									<button
										onClick={() => handleEdit(exp)}
										className="flex items-center text-blue-600 hover:underline"
										aria-label="Edit experience"
									>
										<Edit2 className="w-5 h-5 mr-1" />
										Edit
									</button>
									<button
										onClick={() => handleDelete(exp._id!)}
										className="flex items-center text-red-600 hover:underline"
										aria-label="Delete experience"
									>
										<Trash2 className="w-5 h-5 mr-1" />
										Delete
									</button>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
