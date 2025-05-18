/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const ContactManagement = () => {
	const [messages, setMessages] = useState<any[]>([]);

	useEffect(() => {
		const fetchMessages = async () => {
			const res = await fetch(
				"https://portfolio-v2-alpha-woad.vercel.app/api/contact"
			);
			const { data } = await res.json();
			setMessages(data);
		};
		fetchMessages();
	}, []);

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-4">
				<h1 className="l font-semibold">Messages</h1>
			</div>

			{/* Display Messages Table */}
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>User Name</TableHead>
						<TableHead>User Email</TableHead>
						<TableHead>Message</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{messages.map((message) => (
						<TableRow key={message._id}>
							<TableCell>{message.userName}</TableCell>
							<TableCell>{message.userEmail}</TableCell>
							<TableCell>{message.message}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default ContactManagement;
