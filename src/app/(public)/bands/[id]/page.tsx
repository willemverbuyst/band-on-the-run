import Details from "~/app/_components/band/Details";
import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { id: string } }) {
  const band = await api.band.getOne(params.id);

  return <Details band={band} />;
}
