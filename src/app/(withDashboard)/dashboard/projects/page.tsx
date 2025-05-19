import DashboardProjectTable from "@/components/modules/Dashboard/ProjectManagement/page";
import { getToken } from "@/services/AuthService";
import { redirect } from "next/navigation";

const ProjectTable = async () => {
  const token = await getToken();

  if (!token) redirect("/login");
  // console.log(token);

  return <DashboardProjectTable token={token} />;
};

export default ProjectTable;
