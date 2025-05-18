import DashboardProjectTable from "@/components/modules/Dashboard/ProjectManagement/page";
// import { authOptions } from "@/utils/authOptions";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

const ProjectTable = async () => {
	// const session = await getServerSession(authOptions);

	// // REDIRECT TO LOGIN PAGE IF SESSION IS NOT AVAILABLE
	// if (!session?.user) redirect("/login");

	return <DashboardProjectTable />;
};

export default ProjectTable;
