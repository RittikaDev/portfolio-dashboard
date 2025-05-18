import ContactManagement from "@/components/modules/Dashboard/ContactManagement/page";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const MessageTable = async () => {
	const session = await getServerSession(authOptions);

	// REDIRECT TO LOGIN PAGE IF SESSION IS NOT AVAILABLE
	if (!session?.user) redirect("/login");
	return <ContactManagement />;
};

export default MessageTable;
