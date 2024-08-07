export default function Home() {
  return (
    <main className="bg-gray-100 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-rose-100 2xl:bg-purple-100 h-screen flex items-center justify-center p-5 ">
      <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-3">
        {["Nico", "Me", "You", "Yourself", ""].map((person, idx) => (
          <div key={idx} className="flex items-center group gap-5">
            <div className="size-10 bg-blue-400 rounded-full" />
            <span className="text-lg font-medium empty:w-24 empty:h-5 empty:rounded-full empty:animate-pulse empty:bg-gray-300 group-hover:text-red-500">
              {person}
            </span>
            <div className="size-6 bg-red-500 text-white flex items-center justify-center rounded-full relative">
              <span className="z-10">{idx}</span>
              <div className="size-6 bg-red-500 rounded-full absolute animate-ping "></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
// export default function Home() {
//   return (
//     <main className="bg-gray-100 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-rose-100 2xl:bg-purple-100 h-screen flex items-center justify-center p-5 ">
//       <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-3">
//         <div className="group">
//           <input
//             className=" bg-gray-100 w-full"
//             placeholder="Write tyour email"
//           ></input>
//           <span className="group-focus-within:block hidden">
//             Make sure it is a valid emaile
//           </span>
//           <button>Submit</button>
//         </div>
//       </div>
//     </main>
//   );
// }
