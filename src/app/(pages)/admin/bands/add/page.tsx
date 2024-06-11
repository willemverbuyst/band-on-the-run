import { BandAdd } from "~/components/band/band-add";
import { Icons } from "~/components/icons";
import PageTitle from "~/components/page-title";
import { getServerAuthSession } from "~/server/auth";

export default async function Page() {
  const session = await getServerAuthSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {session ? (
        <>
          <Icons.Music size={40} />
          <BandAdd />
        </>
      ) : (
        <PageTitle title="Not Authorized Dude!" />
      )}
    </div>
  );
}
