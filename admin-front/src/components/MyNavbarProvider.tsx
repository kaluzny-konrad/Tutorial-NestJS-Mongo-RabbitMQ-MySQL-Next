import { Session } from "next-auth";
import MyNavbar from "./MyNavbar/MyNavbar";
import { getAuthSession } from "@/lib/auth";

export default async function MyNavbarProvider() {
  const session: Session | null = await getAuthSession();

  return (
    <MyNavbar session={session} />
  );
}
