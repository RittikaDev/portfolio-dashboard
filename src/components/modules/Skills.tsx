/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ShinyButton from "../ui/shiny-button";
import toast from "react-hot-toast";
import envConfig from "@/config/env.config";

interface Skill {
	_id?: string;
	title: string;
}
type SkillProps = {
	token: string;
};

export default function Skills({ token }: SkillProps) {
	const [skills, setSkills] = useState<Skill[]>([]);
	const [form, setForm] = useState<Skill>({ title: "" });
	const [editingId, setEditingId] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	// Fetch all skills
	const fetchSkills = async () => {
		try {
			setLoading(true);
			// const res = await fetch("http://localhost:5000/api/skills");
			const res = await fetch(`${envConfig.baseApi}/api/skills`);
			const data = await res.json();
			setSkills(data.data);
		} catch (error) {
			console.error("Failed to fetch skills", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchSkills();
	}, []);

	// FORM INPUT CHANGE HANDLER
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	// SUBMIT (CREATE OR UPDATE)
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!form.title.trim()) return;

		try {
			const url = editingId
				? `${envConfig.baseApi}/api/skills/${editingId}`
				: `${envConfig.baseApi}/api/skills`;
			const method = editingId ? "PUT" : "POST";

			const res = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(form),
			});

			const result = await res.json(); // Read the response body

			if (res.ok) {
				setForm({ title: "" });
				setEditingId(null);
				fetchSkills();
			} else toast.error(result?.message || "Failed to save skill");
		} catch (error: any) {
			console.error("Network or JS Error:", error?.message);
		}
	};

	// EDIT SKILL
	const handleEdit = (skill: Skill) => {
		setForm({ title: skill.title });
		setEditingId(skill._id || null);
	};

	// DELETE SKILL
	const handleDelete = async (id: string) => {
		confirmAlert({
			title: "Confirm Deletion",
			message: "Are you sure you want to delete this skill?",
			buttons: [
				{
					label: "Yes",
					onClick: async () => {
						const res = await fetch(`${envConfig.baseApi}/api/skills/${id}`, {
							method: "DELETE",
							headers: { Authorization: `Bearer ${token}` },
						});
						if (res.ok) {
							fetchSkills();
							toast.success("Skills deleted successfully");
							if (id === editingId) {
								setForm({
									title: "",
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

	// Cancel editing (reset form)
	const handleCancel = () => {
		setForm({ title: "" });
		setEditingId(null);
	};

	return (
		<div className="p-6 max-w-3xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">Skills</h1>

			<form onSubmit={handleSubmit} className="flex gap-2 mb-6">
				<input
					name="title"
					value={form.title}
					onChange={handleChange}
					placeholder="Enter skill"
					required
					className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<ShinyButton
					type="submit"
					aria-label={editingId ? "Update skill" : "Add skill"}
				>
					<span className="flex items-center gap-1 text-sm">
						{editingId ? "Update" : "Add"}
						<Plus size={16} />
					</span>
				</ShinyButton>
				{editingId && (
					<button
						type="button"
						onClick={handleCancel}
						className="flex items-center gap-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 rounded"
					>
						Cancel
					</button>
				)}
			</form>

			{loading ? (
				<p>Loading skills...</p>
			) : (
				<ul className="flex flex-wrap gap-4">
					{skills.length === 0 && (
						<p className="text-muted-foreground">No skills found. Add some!</p>
					)}
					{skills.map((skill) => (
						<li key={skill._id} className="flex items-center">
							<Badge
								variant="secondary"
								className="flex items-center gap-2 cursor-pointer select-none group px-4 py-2 text-sm rounded-md"
								onClick={() => handleEdit(skill)}
								title="Edit skill"
							>
								{skill.title}
								<button
									onClick={(e) => {
										e.stopPropagation();
										handleDelete(skill._id!);
									}}
									aria-label="Delete skill"
									className="hover:text-destructive focus:outline-none"
								>
									<Trash2 size={16} />
								</button>
							</Badge>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
