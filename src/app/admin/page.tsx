import { getServerAuthSession } from "~/server/auth";
import { CreateBand } from "../_components/CreateBand";
import PageTitle from "../_components/PageTitle";

export default async function Page() {
  const session = await getServerAuthSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {session ? (
        <>
          <PageTitle title="Admin" />
          <CreateBand />
        </>
      ) : (
        <PageTitle title="Not Authorized Dude!" />
      )}
    </div>
  );
}
