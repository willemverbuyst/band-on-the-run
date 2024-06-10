import { Icons } from "~/components/icons";
import PageTitle from "~/components/page-title";
import { ShowAdd } from "~/components/show/show-add";
import { getServerAuthSession } from "~/server/auth";

export default async function Page() {
  const session = await getServerAuthSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {session ? (
        <>
          <Icons.music size={40} />
          <ShowAdd />
        </>
      ) : (
        <PageTitle title="Not Authorized Dude!" />
      )}
    </div>
  );
}
