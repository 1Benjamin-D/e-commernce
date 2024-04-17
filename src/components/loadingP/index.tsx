
export default function LoadingP() {
  return(
    <div  className= " bg-slate-300 animate-pulse w-[250px] h-[350px] rounded-2xl shadow-xl border-[3px] p-2 flex flex-col items-center">
      <div className="bg-gray-800/40 rounded w-[75%] h-[100px] mt-12"></div>
      <section className="flex flex-col gap-3 text-center mt-12 items-center">
        <div>
          <div className=" bg-gray-800/40 rounded h-4 w-36"></div>
        </div>
        <div>
          <div className=" bg-gray-800/40 rounded h-4 w-36"></div>
        </div>
        <div>
          <div className=" bg-gray-800/40 rounded h-8 w-16"></div>
        </div>

      </section>

    </div>
  )
}