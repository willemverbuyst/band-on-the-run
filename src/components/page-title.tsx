export default function PageTitle({ title }: { title: string }) {
  return (
    <h1 className="text-center text-4xl font-extrabold tracking-tight text-yellow-500 sm:text-[5rem] lg:text-5xl">
      {title}
    </h1>
  );
}
