"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ShinyButton from "@/components/ui/shiny-button";
import { FileUser } from "lucide-react";

const ResumeDropdown = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<ShinyButton className="px-8 py-3">
					<div className="flex items-center space-x-2">
						<FileUser />
						<span>Resume</span>
					</div>
				</ShinyButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				<DropdownMenuItem>
					<a
						className="w-full block"
						href={`https://drive.google.com/file/d/1Rnxv1I4cyd8prLjPCuVQeD5cO_D4CyC1/view`}
						target="_blank"
						rel="noopener noreferrer"
					>
						View
					</a>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<a
						className="w-full block"
						href="/RITTIKA_DEV.pdf"
						target="_blank"
						rel="noopener noreferrer"
					>
						Download
					</a>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ResumeDropdown;
