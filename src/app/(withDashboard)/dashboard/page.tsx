import Dashboard from "@/components/modules/Dashboard/Dashboard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) redirect("/login");

  return <Dashboard token={token} />;
};

export default DashboardPage;
