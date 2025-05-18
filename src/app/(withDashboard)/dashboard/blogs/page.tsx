import BlogManagement from "@/components/modules/Dashboard/BlogManangement/page";
// import { authOptions } from "@/utils/authOptions";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

const BlogTable = async () => {
	// const session = await getServerSession(authOptions);

	// // REDIRECT TO LOGIN PAGE IF SESSION IS NOT AVAILABLE
	// if (!session?.user) redirect("/login");
	return <BlogManagement />;
};

export default BlogTable;
