"use client";
import React from "react";
import Image from "next/image";

import Profile from "@/../public/portfolio.jpeg";
import HandIcon from "@/../public/hand-icon.png";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Header = () => {
	return (
		<div className="dark:bg-darkTheme bg-lightTheme">
			<div className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-6">
				<motion.div
					initial={{ scale: 0 }}
					whileInView={{ scale: 1 }}
					transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
				>
					<Image
						src={Profile}
						alt="profile"
						className="rounded-full w-28 h-28 md:w-48 md:h-48"
					/>
				</motion.div>
				<motion.h3
					initial={{ y: -20, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="flex items-end gap-2 text-lg sm:text-xl md:text-2xl mb-6 font-Poppins"
				>
					Rittika Dev
					<Image src={HandIcon} alt="hand-icon" className="w-6 mb-1" />
				</motion.h3>
				<motion.h1
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.8 }}
					className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-slate-300 mb-6"
				>
					Full-Stack Developer
					<motion.p
						initial={{ y: -20, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="mt-6 max-w-3xl text-xl sm:text-2xl mx-auto text-gray-700 dark:text-slate-400 font-medium"
					>
						I have more than 3 years of experience focusing on{" "}
						<span className="text-teal-500">React</span>,{" "}
						<span className="text-teal-500">Next</span>, &{" "}
						<span className="text-teal-500">Angular</span>.
					</motion.p>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
						<motion.div
							initial={{ y: 30, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.6, delay: 1 }}
						>
							<Link
								href="/contact"
								className="px-8 py-2 border border-teal-500 rounded-full bg-teal-500 text-white text-lg font-semibold flex items-center gap-2 hover:bg-teal-600"
							>
								Contact Me
								<ArrowRight className="w-4" />
							</Link>
						</motion.div>
						<motion.div
							initial={{ y: 30, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.6, delay: 1.2 }}
						>
							<Link
								href="/projects"
								className="px-8 py-2 border rounded-full border-gray-500 text-lg font-semibold flex items-center gap-2 hover:bg-gray-200"
							>
								Check My Works
								<ArrowRight className="w-4" />
							</Link>
						</motion.div>
					</div>
				</motion.h1>
			</div>
		</div>
	);
};

export default Header;
