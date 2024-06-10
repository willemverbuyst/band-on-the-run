import Link from "next/link";
import { Icons } from "./icons";

export default function DashboardMenuTitle() {
  return (
    <Link href="/dashboard">
      <h4 className="flex items-center">
        <Icons.fileBarChart className="text-primary" /> Dashboard
      </h4>
    </Link>
  );
}
