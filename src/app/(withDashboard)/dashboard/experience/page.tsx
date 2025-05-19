import Experience from "@/components/modules/Experience";
import { getToken } from "@/services/AuthService";
import { redirect } from "next/navigation";

const ExperincePage = async () => {
  const token = await getToken();

  if (!token) redirect("/login");
  return <Experience token={token} />;
};

export default ExperincePage;
