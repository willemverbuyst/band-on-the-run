import Link from "next/link";

export default function DashboardMenuTitle() {
  return (
    <h4>
      <Link href="/dashboard" className="flex items-center">
        Dashboard
      </Link>
    </h4>
  );
}
