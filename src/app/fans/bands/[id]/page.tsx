import PageTitle from "~/app/_components/PageTitle";
import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { id: string } }) {
  const band = await api.band.getOne(params.id);

  if (!band) {
    return <div>Band not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <PageTitle title={band.name} />
      <h3 className="text-center">
        {band.country} - {band.foundedYear}
      </h3>
      <p className="flex max-w-[400px] text-justify">{band.bio}</p>
      <div className="flex justify-around gap-2">
        {band.genre.map((g) => (
          <span className="rounded-xl bg-sky-500 px-3 py-1" key={g}>
            {g}
          </span>
        ))}
      </div>
    </div>
  );
}
