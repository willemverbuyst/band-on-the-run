export default function PageTitle({ title }: { title: string }) {
  return (
    <h1 className="text-center text-5xl font-extrabold tracking-tight text-yellow-500 sm:text-[5rem]">
      {title}
    </h1>
  );
}
