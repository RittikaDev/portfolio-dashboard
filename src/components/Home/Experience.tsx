"use client";
import React from "react";

import { useTheme } from "@/context/theme-context";

import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { BriefcaseBusiness } from "lucide-react";
import { useSectionInView } from "@/lib/hooks";

const Experience = () => {
	const { inView } = useSectionInView("Experience", 0.1);
	const { theme } = useTheme();

	const experiences = {
		data: [
			{
				id: "1",
				title: "Graduated",
				location: "Chittagong, Bangladesh",
				date: "2021",
				description:
					"I graduated with a degree in Computer Science and Engineering (CSE). My academic journey in CSE has equipped me with a strong foundation in technology and problem-solving",
			},
			{
				id: "2",
				title: "Intern Software Developer",
				location: "KDS Group",
				date: "August 2021 - Dec 2021",
				description:
					"Mainly built the menu system for HRMS using Angular and Angular Material UI . Also worked on various side projects, enhancing my skills in web development.",
			},
			{
				id: "3",
				title: "Jr. Software Developer",
				location: "KDS Group",
				date: "Jan 2022 - Prsent",
				description:
					"Worked on product-based projects, with a primary focus on developing HRMS and payroll systems using Angular, .NET Core, and Oracle. Gained hands-on experience in full-stack development, collaborating with a team to build efficient and scalable solutions.",
			},
		],
	};

	return (
		<section id="experience" className="mb-28 scroll-mt-28 sm:mb-40">
			{/* <h2 className="mb-8 text-center text-3xl font-medium capitalize">
				My experience
			</h2> */}
			<h1 className="mb-8 text-center font-bold text-4xl md:text-5xl pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-teal-900 to-teal-400 bg-clip-text leading-none text-transparent  dark:from-white dark:to-slate-900/10">
				My experience
			</h1>
			<VerticalTimeline lineColor="" animate={true}>
				{experiences.data.map((item) => {
					const experience = item;
					return (
						<React.Fragment key={item.id}>
							<VerticalTimelineElement
								visible={inView}
								contentStyle={{
									background:
										theme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
									boxShadow: "none",
									border: "1px solid rgba(0, 0, 0, 0.05)",
									textAlign: "left",
									padding: "1.3rem 2rem",
								}}
								contentArrowStyle={{
									borderRight:
										theme === "light"
											? "0.4rem solid #9ca3af"
											: "0.4rem solid rgba(255, 255, 255, 0.5)",
								}}
								date={experience.date}
								icon={<BriefcaseBusiness />}
								iconStyle={{
									background:
										theme === "light" ? "white" : "rgba(255, 255, 255, 0.15)",
									fontSize: "1.5rem",
								}}
							>
								<h3 className="font-semibold capitalize">{experience.title}</h3>
								<p className="!mt-0 font-normal">{experience.location}</p>
								<p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
									{experience.description}
								</p>
							</VerticalTimelineElement>
						</React.Fragment>
					);
				})}
			</VerticalTimeline>
		</section>
	);
};

export default Experience;
