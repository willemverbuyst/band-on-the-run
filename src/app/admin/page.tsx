import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import PageTitle from "../_components/PageTitle";

export default async function Page() {
  const session = await getServerAuthSession();

  return (
    <div className="flex min-h-screen flex-col items-center gap-8">
      {session ? (
        <>
          <PageTitle title="Admin" />
          <div className="container flex flex-col items-center justify-center gap-12 px-4 ">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
                href="/admin/bands/add"
              >
                <h3 className="text-2xl font-bold">Add new band →</h3>
              </Link>
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
                href="/admin/shows/add"
              >
                <h3 className="text-2xl font-bold">Add new show →</h3>
              </Link>
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
                href="/admin/bands/update"
              >
                <h3 className="text-2xl font-bold">Edit bands details →</h3>
              </Link>
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
                href="/admin/shows/update"
              >
                <h3 className="text-2xl font-bold">Edit show details →</h3>
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
