import Details from "~/app/_components/show/Details";
import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { id: string } }) {
  const show = await api.show.getOne(params.id);

  return <Details show={show} />;
}
