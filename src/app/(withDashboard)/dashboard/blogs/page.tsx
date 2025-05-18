import BlogManagement from "@/components/modules/Dashboard/BlogManangement/page";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BlogTable = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) redirect("/login");

  return <BlogManagement token={token} />;
};

export default BlogTable;
