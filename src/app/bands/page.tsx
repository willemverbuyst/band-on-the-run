import Link from "next/link";
import { api } from "~/trpc/server";

export default async function Page() {
  const bands = await api.band.getAll();

  return (
    <div>
      <ul>
        {bands.map((b) => (
          <li key={b.id}>
            <Link href={`/bands/${b.id}`}>{b.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
