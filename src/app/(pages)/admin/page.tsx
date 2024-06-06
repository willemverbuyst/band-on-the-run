import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import PageTitle from "../../../components/page-title";

export const metadata = {
  title: "bandOnTheRun | Admin",
  description: "Admin page.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function Page() {
  const session = await getServerAuthSession();

  return (
    <div className="flex flex-col items-center gap-4">
      {session ? (
        <>
          <PageTitle title="Admin" />
          <div className="container flex flex-col items-center justify-center gap-12 px-4 ">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
                href="/admin/bands/add"
              >
                <h5>Add new band →</h5>
              </Link>
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
                href="/admin/shows/add"
              >
                <h5>Add new show →</h5>
              </Link>
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
                href="/admin/bands/update"
              >
                <h5>Edit bands details →</h5>
              </Link>
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
                href="/admin/shows/update"
              >
                <h5>Edit show details →</h5>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <PageTitle title="Not Authorized Dude!" />
      )}
    </div>
  );
}