import Link from "next/link";

export default function NavBar() {
  return (
    <div className="grid grid-cols-3 bg-gray-200 p-2 dark:bg-gray-800">
      <section className="mr-auto px-3">
        <h1 className="text-xl text-cyan-500">
          <Link href="/" className="px-5">
            bandOnTheRun
          </Link>
        </h1>
      </section>
      <nav className="flex justify-center">
        <Link href="/" className="px-5">
          Home
        </Link>
        <Link href="/shows" className="px-5">
          Shows
        </Link>
        <Link href="/bands" className="px-5">
          Bands
        </Link>
      </nav>
      <section className="ml-auto px-3">
        <button>Log In</button>
      </section>
    </div>
  );
}
