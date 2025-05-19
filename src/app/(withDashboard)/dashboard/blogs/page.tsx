import BlogManagement from "@/components/modules/Dashboard/BlogManangement/page";
import { getToken } from "@/services/AuthService";
import { redirect } from "next/navigation";

const BlogTable = async () => {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("authToken")?.value;

  const token = await getToken();

  if (!token) redirect("/login");

  return <BlogManagement token={token} />;
};

export default BlogTable;
