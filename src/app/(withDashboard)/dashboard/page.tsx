import Dashboard from "@/components/modules/Dashboard/Dashboard";
import { getToken } from "@/services/AuthService";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("authToken")?.value;

  const token = await getToken();
  console.log("dashboard", token);
  if (!token) redirect("/login");
  return <Dashboard />;
};

export default DashboardPage;
