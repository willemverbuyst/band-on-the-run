export default function GenreBadge({
  genre,
  customStyle,
}: {
  genre: string;
  customStyle?: string;
}) {
  return (
    <span className={`rounded-xl bg-cyan-500 px-2 py-1 text-xs ${customStyle}`}>
      {genre}
    </span>
  );
}
