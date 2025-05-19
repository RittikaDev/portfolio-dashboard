import DashboardProjectTable from "@/components/modules/Dashboard/ProjectManagement/page";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ProjectTable = async () => {
	const cookieStore = await cookies();
	const token = cookieStore.get("authToken")?.value;

	if (!token) redirect("/login");
	// console.log(token);

	return <DashboardProjectTable token={token} />;
};

export default ProjectTable;
