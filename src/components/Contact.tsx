"use client";
// import envConfig from "@/config/env.config";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import toast from "react-hot-toast";
import ShinyButton from "@/components/ui/shiny-button";
import { Mail, LucideLinkedin } from "lucide-react";

const Contact = () => {
	const [formData, setFormData] = useState({
		userName: "",
		userEmail: "",
		message: "",
	});

	const [pending, setPending] = useState(false);
	const [isClient, setIsClient] = useState(false); // State to check if we're on the client

	useEffect(() => {
		setIsClient(true); // This will set `isClient` to true only after the component is mounted on the client
	}, []);

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setPending(true);
		// console.log(`${envConfig.baseApi}/api/contact`);
		// console.log(`https://portfolio-v2-alpha-woad.vercel.app//api/contact`);
		try {
			const response = await fetch(
				`https://portfolio-v2-alpha-woad.vercel.app/api/contact` as string,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);

			const result = await response.json();
			if (!response.ok) throw new Error(result.error || "Something went wrong");

			toast.success("Message sent successfully!");
			setFormData({ userName: "", userEmail: "", message: "" });
		} catch (error) {
			console.log(error);
			toast.error("Failed to send a message");
		} finally {
			setPending(false);
		}
	};

	const isFormIncomplete = Object.values(formData).some(
		(value) => value.trim() === ""
	);

	return (
		<motion.section
			id="contact"
			className="mb-20 w-[min(100%,38rem)] mx-auto scroll-mt-28 text-center sm:mb-28"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1 }}
			viewport={{ once: true }}
		>
			{isClient ? (
				<div className="max-w-7xl mx-auto">
					<h1 className="pb-20 pt-36 text-center font-bold text-4xl md:text-5xl pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-teal-900 to-teal-400 bg-clip-text leading-none text-transparent dark:from-white dark:to-slate-900/10">
						Let&apos;s have a chat!
					</h1>

					<div className="flex space-x-2 md:space-x-4 justify-center">
						<a href="mailto:rittika.dev@gmail.com">
							<ShinyButton className="rounded-lg px-4 md:px-6 ">
								<div className="flex items-center space-x-2">
									<Mail />
									<span className="capitalize">Email</span>
								</div>
							</ShinyButton>
						</a>

						<a href="https://www.linkedin.com/in/rittika-dev/">
							<ShinyButton className="rounded-lg px-4 md:px-6 ">
								<div className="flex items-center space-x-2">
									<LucideLinkedin />
									<span className="capitalize">Linkedin</span>
								</div>
							</ShinyButton>
						</a>
					</div>

					<form
						className="mt-10 flex flex-col dark:text-black"
						onSubmit={handleSubmit}
					>
						<input
							className="borderBlack special-border h-14 px-4 text-sm font-semibold transition-all dark:bg-gray-900 dark:bg-opacity-80 dark:text-gray-300 dark:outline-none dark:focus:bg-opacity-100"
							name="userName"
							type="text"
							required
							maxLength={100}
							placeholder="Your name"
							value={formData.userName}
							onChange={handleChange}
						/>
						<input
							className="borderBlack special-border h-14 px-4 text-sm font-semibold transition-all dark:bg-gray-900 dark:bg-opacity-80 dark:text-gray-300 dark:outline-none dark:focus:bg-opacity-100 mt-3"
							name="userEmail"
							type="email"
							required
							maxLength={500}
							placeholder="Your email"
							value={formData.userEmail}
							onChange={handleChange}
						/>
						<textarea
							className="borderBlack special-border my-3 h-52 p-4 text-sm font-semibold transition-all dark:bg-gray-900 dark:bg-opacity-80 dark:text-gray-300 dark:outline-none dark:focus:bg-opacity-100"
							name="message"
							placeholder="Your message"
							required
							maxLength={5000}
							value={formData.message}
							onChange={handleChange}
						/>
						<button
							type="submit"
							className="special-border group flex h-[3rem] w-[8rem] items-center justify-center gap-2 bg-teal-600 text-white outline-none transition-all hover:scale-110 hover:bg-teal-500 focus:scale-110 active:scale-105 disabled:scale-100 disabled:bg-opacity-65 dark:bg-white dark:bg-opacity-10"
							disabled={isFormIncomplete || pending}
						>
							{pending ? (
								<div className="special-border h-5 w-5 animate-spin border-b-2 border-white"></div>
							) : (
								<>
									Submit
									<FaPaperPlane className="text-xs opacity-70 transition-all group-hover:-translate-y-1 group-hover:translate-x-1" />
								</>
							)}
						</button>
					</form>
				</div>
			) : null}
		</motion.section>
	);
};

export default Contact;
