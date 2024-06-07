import Link from "next/link";
import { Icons } from "~/components/icons";
import PageTitle from "~/components/page-title";
import { showTypes } from "~/lib/showType";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      <PageTitle title="Band on the Run" />
      <div className="container flex flex-col items-center justify-center gap-12 px-4 ">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href={{
              pathname: "/shows",
              query: { showType: showTypes.join(",") },
            }}
          >
            <h3>Fans →</h3>
            <div className="text-lg">
              Looking for a show of your favorite band? Discover who is on the
              road.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="/admin"
          >
            <h3>Bands →</h3>
            <div className="text-lg">
              Update your band&apos;s tour dates and let your fans know where
              you are.
            </div>
          </Link>
        </div>
        <div className="flex max-w-prose flex-col gap-2">
          <h2 className="flex items-center justify-center gap-2">
            Welcome to <Icons.music className="h-6 w-6 text-cyan-500" />
            <span className="text-cyan-500">bandOnTheRun</span>
          </h2>

          <h3 className="text-center text-xl text-gray-500">
            the ultimate destination for connecting bands with their fans!
          </h3>

          <section className="flex flex-col gap-5 text-justify">
            <p>
              <b>For Fans:</b> Are you a music lover eager to catch your
              favorite band live in concert? Our &quot;Fans&quot; section is
              just for you. Here, you can discover which bands are currently on
              tour and find shows near you. Stay up-to-date with the latest tour
              dates and never miss a chance to see your favorite artists perform
              live.
            </p>
            <p>
              <b>For Bands:</b> Are you a band looking to keep your fans
              informed about your latest tour dates? The &quot;Bands&quot;
              section allows you to easily update your tour schedule. Make sure
              your fans know exactly where and when you&apos;ll be performing
              next. Keep the excitement alive and ensure a great turnout at
              every show by keeping your tour information current.
            </p>
            <p>
              Explore the sections by clicking on the links and start your
              journey with &quot;Band on the Run&quot; today! Whether
              you&apos;re a fan looking for a show or a band updating your tour
              dates, we&apos;ve got you covered.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
