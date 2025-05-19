"use client";

import { useGetMeQuery } from "@/redux/features/authApi";
import React from "react";
import {
	FolderKanban,
	FileText,
	BriefcaseBusiness,
	Sparkles,
	Mailbox,
	LogOut,
} from "lucide-react";

type DashboardProps = {
	token: string;
};

const Dashboard = ({ token }: DashboardProps) => {
	const { data: user } = useGetMeQuery(token);
	const userInfo = user?.data;

	const adminActions = [
		{
			title: "Manage Projects",
			description: "Add new, update, or delete projects in your portfolio.",
			icon: <FolderKanban className="w-6 h-6 text-emerald-600" />,
		},
		{
			title: "Manage Blogs",
			description: "Write, edit, or remove blog posts for your website.",
			icon: <FileText className="w-6 h-6 text-emerald-600" />,
		},
		{
			title: "Manage Skills",
			description: "Update your skill set shown on the portfolio.",
			icon: <Sparkles className="w-6 h-6 text-emerald-600" />,
		},
		{
			title: "Manage Experience",
			description: "Add or modify past job experiences and details.",
			icon: <BriefcaseBusiness className="w-6 h-6 text-emerald-600" />,
		},
		{
			title: "View Messages",
			description: "See who has contacted you via the contact form.",
			icon: <Mailbox className="w-6 h-6 text-emerald-600" />,
		},
		{
			title: "Logout",
			description: "Securely sign out from the admin dashboard.",
			icon: <LogOut className="w-6 h-6 text-emerald-600" />,
		},
	];

	return (
		<div className="min-h-screen py-10 px-4 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-100 to-white dark:from-gray-900 dark:to-gray-800">
			{userInfo && (
				<>
					<h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-2">
						Admin Dashboard
					</h1>
					<p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
						Logged in as:
						<span className="font-semibold text-emerald-700 dark:text-emerald-300">
							{" "}
							{userInfo.email}
						</span>
					</p>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full">
						{adminActions.map((action, index) => (
							<div
								key={index}
								className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-5 flex items-start gap-4 hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
							>
								<div>{action.icon}</div>
								<div>
									<h3 className="text-lg font-semibold text-gray-800 dark:text-white">
										{action.title}
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-300">
										{action.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Dashboard;
