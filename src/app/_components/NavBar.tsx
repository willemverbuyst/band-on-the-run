import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { showTypes } from "~/utils/showType";

export default async function NavBar() {
  const session = await getServerAuthSession();

  return (
    <section className="grid grid-cols-3 p-2">
      <nav className="mr-auto flex items-center px-3">
        <Link href="/" className="px-5">
          <h1 className="text-xl text-cyan-500">bandOnTheRun</h1>
        </Link>
      </nav>
      <nav className="flex items-center justify-center">
        <Link
          href={{
            pathname: "/shows",
            query: { showType: showTypes.join(",") },
          }}
          className="px-5"
        >
          Shows
        </Link>
        <Link href="/bands" className="px-5">
          Bands
        </Link>
        {session && (
          <Link href="/admin" className="px-5">
            Admin
          </Link>
        )}
      </nav>
      <nav className="ml-auto flex px-3 ">
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded border border-cyan-500 px-2 py-1 text-cyan-500 hover:bg-gray-700"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </nav>
    </section>
  );
}
