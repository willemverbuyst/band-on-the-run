import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export default async function NavBar() {
  const session = await getServerAuthSession();

  return (
    <div className="grid grid-cols-3 bg-gray-800 p-2">
      <section className="mr-auto flex items-center px-3">
        <h1 className="text-xl text-cyan-500">
          <Link href="/" className="px-5">
            bandOnTheRun
          </Link>
        </h1>
      </section>
      <nav className="flex items-center justify-center">
        <Link href="/" className="px-5">
          Home
        </Link>
        <Link href="/shows" className="px-5">
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
      <section className="ml-auto flex px-3 ">
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded border border-cyan-500 px-2 py-1 text-cyan-500 hover:bg-gray-700"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </section>
    </div>
  );
}
