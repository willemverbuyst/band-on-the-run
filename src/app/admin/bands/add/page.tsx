import { CreateBand } from "~/app/_components/CreateBand";
import PageTitle from "~/app/_components/PageTitle";
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
