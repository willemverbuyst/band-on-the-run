import Link from "next/link";

export default async function Home() {
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="text-5xl font-extrabold tracking-tight text-yellow-500 sm:text-[5rem]">
        Band on the Run
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
          href="fan"
        >
          <h3 className="text-2xl font-bold">Music fans →</h3>
          <div className="text-lg">
            Learn more about your favorite musicians. Discover which bands are
            on the road.
          </div>
        </Link>
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
          href="pro"
        >
          <h3 className="text-2xl font-bold">Music pros →</h3>
          <div className="text-lg">
            Add tour dates, manage your band&apos;s profile, and more.
          </div>
        </Link>
      </div>
    </div>
  );
}
