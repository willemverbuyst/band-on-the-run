export default function GenreBadge({ genre }: { genre: string }) {
  return (
    <span className="rounded-xl bg-cyan-500 px-2 py-1 text-xs">{genre}</span>
  );
}
