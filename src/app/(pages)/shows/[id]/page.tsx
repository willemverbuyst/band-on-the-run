import Details from "~/components/show/details";
import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { id: string } }) {
  const show = await api.show.getOne(params.id);

  return <Details show={show} />;
}
