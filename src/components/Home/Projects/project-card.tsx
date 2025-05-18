import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { IProject } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface IProps {
	project: IProject;
}

export function ProjectCard({ project }: IProps) {
	return (
		<CardContainer className="transition-all transform duration-500 hover:scale-105 hover:shadow-lg hover:shadow-neutral-600/20 mb-12">
			<CardBody className="relative bg-gray-100 dark:bg-neutral-800 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700 w-auto shadow-md hover:shadow-xl dark:hover:shadow-emerald-500/[0.15]">
				{/* Live Link Button */}
				<div className="absolute top-4 right-4">
					<CardItem
						translateZ={20}
						as={Link}
						href={project?.frontend?.deploymentLink || "#"}
						target="__blank"
						className="px-4 py-2 rounded-lg bg-teal-600 text-white text-xs font-semibold transform transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-teal-700"
					>
						Live Link
					</CardItem>
				</div>
				<CardItem
					translateZ="50"
					className="text-2xl font-semibold text-neutral-700 dark:text-white transition-all duration-300 ease-in-out"
				>
					{project?.title}
				</CardItem>
				<CardItem
					as="p"
					translateZ="60"
					className="text-neutral-600 dark:text-neutral-300 text-sm mt-2 opacity-90 hover:opacity-100 transition-opacity duration-300 ease-in-out"
				>
					{project?.brief}
				</CardItem>
				<CardItem
					translateZ="100"
					className="w-full mt-4 overflow-hidden rounded-xl"
				>
					<Image
						src={project?.cover}
						height="1000"
						width="1000"
						className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-2xl transition-shadow duration-300"
						alt="thumbnail"
					/>
				</CardItem>
				<div className="flex justify-center items-center mt-6">
					<CardItem
						translateZ={20}
						as={Link}
						href={`/projects/${project?._id}`}
						className="px-20 py-3 rounded-lg bg-teal-600 text-white text-sm font-semibold transform transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-teal-700"
					>
						View Details
					</CardItem>
				</div>
			</CardBody>
		</CardContainer>
	);
}
