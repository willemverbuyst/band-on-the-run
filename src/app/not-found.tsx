export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl">
        <span className="text-yellow-500">404</span>{" "}
        <span className="text-5xl text-gray-500">|</span>{" "}
        <span className="italic">This page could not be found</span>
      </h1>
    </div>
  );
}
