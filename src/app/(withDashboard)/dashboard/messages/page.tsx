import ContactManagement from "@/components/modules/Dashboard/ContactManagement/page";
import { getToken } from "@/services/AuthService";
import { redirect } from "next/navigation";

const MessageTable = async () => {
  const token = await getToken();

  if (!token) redirect("/login");
  console.log(token);
  return <ContactManagement token={token} />;
};

export default MessageTable;
