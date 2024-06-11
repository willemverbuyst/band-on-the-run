import Details from "~/components/band/band-details";
import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { id: string } }) {
  const band = await api.band.getOne(params.id);

  return <Details band={band} />;
}
