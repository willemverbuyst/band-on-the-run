import Link from "next/link";
import { Icons } from "../icons";

export default function DashboardMenuTitle() {
  return (
    <h4>
      <Link href="/dashboard" className="flex items-center">
        <Icons.fileBarChart className="text-primary" /> Dashboard
      </Link>
    </h4>
  );
}
