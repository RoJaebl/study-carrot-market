export default function Home() {
  return (
    <main className="bg-gray-100 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-rose-100 2xl:bg-purple-100 h-screen flex items-center justify-center p-5 ">
      <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-3">
        {["Nico", "Me", "You", "Yourself"].map((person, idx) => (
          <div key={idx} className="flex items-center gap-5 *:animate-pulse ">
            <div className="size-10 bg-blue-400 rounded-full" />
            <div className="w-40 h-4 rounded-full bg-gray-400" />
            <div className="w-20 h-4 rounded-full bg-gray-400" />
          </div>
        ))}
      </div>
    </main>
  );
}
