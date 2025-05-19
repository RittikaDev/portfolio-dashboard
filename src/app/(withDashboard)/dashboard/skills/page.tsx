import Skills from "@/components/modules/Skills";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SkillsPage = async () => {
	const cookieStore = await cookies();
	const token = cookieStore.get("refreshToken")?.value;

	if (!token) redirect("/login");
	return <Skills token={token} />;
};

export default SkillsPage;
