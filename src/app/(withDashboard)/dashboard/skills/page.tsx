import Skills from "@/components/modules/Skills";
import { getToken } from "@/services/AuthService";
import { redirect } from "next/navigation";

const SkillsPage = async () => {
  const token = await getToken();

  if (!token) redirect("/login");
  return <Skills token={token} />;
};

export default SkillsPage;
