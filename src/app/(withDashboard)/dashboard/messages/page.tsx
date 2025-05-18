import ContactManagement from "@/components/modules/Dashboard/ContactManagement/page";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const MessageTable = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) redirect("/login");
  return <ContactManagement />;
};

export default MessageTable;
