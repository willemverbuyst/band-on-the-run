import { CreateBand } from "~/components/band/create-band";
import PageTitle from "~/components/page-title";
import { getServerAuthSession } from "~/server/auth";

export default async function Page() {
  const session = await getServerAuthSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {session ? (
        <>
          <PageTitle title="Add new band" />
          <CreateBand />
        </>
      ) : (
        <PageTitle title="Not Authorized Dude!" />
      )}
    </div>
  );
}
