import Link from "next/link";

export default function NavBar() {
  return (
    <div className="flex items-center justify-between bg-gray-200 p-2 dark:bg-gray-800">
      <h1 className="text-xl">band on the run</h1>
      <nav>
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
      <button>Log In</button>
    </div>
  );
}
