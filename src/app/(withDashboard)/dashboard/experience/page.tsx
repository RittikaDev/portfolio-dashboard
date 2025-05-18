import Experience from "@/components/modules/Experience";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ExperincePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) redirect("/login");
  return <Experience token={token} />;
};

export default ExperincePage;
