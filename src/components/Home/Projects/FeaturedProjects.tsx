import React from "react";
import Link from "next/link";

import ShinyButton from "@/components/ui/shiny-button";
import envConfig from "@/config/env.config";
import { IProject } from "@/types";

import { ChevronRight } from "lucide-react";

import { ProjectCard } from "./project-card";

const FeaturedProjects = async () => {
	const res = await fetch(
		`${envConfig.baseApi}/api/projects/featured` as string,
		{
			next: {
				revalidate: 120,
			},
		}
	);
	const { data } = await res.json();

	return (
		<section className="py-20" id="projects">
			<div className="max-w-7xl mx-auto">
				<div className="mb-10">
					<h1 className=" text-center font-bold text-4xl md:text-5xl pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-teal-900 to-teal-400 bg-clip-text leading-none text-transparent  dark:from-white dark:to-slate-900/10">
						Featured Projects
					</h1>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{data.slice(0, 2)?.map((project: IProject) => (
						<ProjectCard key={project._id} project={project} />
					))}
				</div>

				<div className="flex justify-center mt-10">
					<Link href={`/projects`}>
						<ShinyButton>
							<div className="flex space-x-2">
								<span className="capitalize text-base font-medium inline-block">
									See More
								</span>
								<ChevronRight />
							</div>
						</ShinyButton>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default FeaturedProjects;
