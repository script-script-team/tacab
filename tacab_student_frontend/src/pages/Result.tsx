import { result } from "./Example";
import { PiStudentFill } from "react-icons/pi";
import { CiGrid41 } from "react-icons/ci";
import { IoIosBookmarks } from "react-icons/io";
import { MdIncompleteCircle } from "react-icons/md";
import CountUp from "react-countup"

function Result() {

  interface data {
    name: string;
    id: string;
  }

  const data: data = JSON.parse(localStorage.getItem("login")!);
  const avarage = result.map((u) => u.marks).reduce((a, b) => a + b, 0) / result.length

  return (
    <div className="w-full mb-5">
      <div className="mt-24">
        <h2 className="text-5xl font-bold text-center text-yellow-500">Your Academic Results</h2>
        <p className="text-center">Viewing results for Term 1, {new Date().getFullYear()}</p>
        <div className="w-[80%] xs:w-[90%] m-auto my-10 p-5 bg-gray-100 dark:bg-gray-900 rounded-lg flex justify-between">
          <div className="flex flex-col">
              <PiStudentFill />
            <p className="text-gray-500 xs:text-sm">
              Student Name:
            </p>
          <h2 className="font-[500] xs:text-sm">{data?.name}</h2>
          </div>
          <div className="flex flex-col">
            <CiGrid41 />
            <p className="text-gray-500 xs:text-sm">
              Student ID:
              </p>
            <h2 className="font-[500] xs:text-sm">{data?.id}</h2>
          </div>
          <div className="flex flex-col">
            <IoIosBookmarks />
            <p className="text-gray-500 xs:text-sm">Total Subjects:</p>
            <div className="flex gap-1">
              <CountUp className="font-bold" start={0} end={result.length > 0 ? Number(result.length) : 0} />
              <h2 className="xs:text-sm">subject</h2>
            </div>
          </div>
          <div className="flex flex-col">
            <MdIncompleteCircle />
            <p className="text-gray-500 xs:text-sm">Avarage:</p>
            <div className="flex">
              <CountUp className="font-bold" start={0} end={avarage > 0 ? Number(avarage) : 0} />%
            </div>
          </div>
        </div>
        <div className="w-[80%] xs:w-[90%] flex flex-col gap-4 m-auto relative p-5 bg-gray-100 dark:bg-gray-900 rounded-lg">
          <header>
            <h2 className="text-3xl font-[500] xs:text-[1.8rem]">Subject Results</h2>
            <p className="xs:text-sm">Your performance across all subjects</p>
          </header>

          {result.map((sub, index) => {
            return (
                <div key={index} className="dark:hover:bg-cyan-950 dark:hover:border-cyan-600 hover:bg-yellow-50 hover:border-yellow-300 w-full py-1 px-5 rounded-md border dark:border-gray-800 border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <h2 className="font-[500] text-2xl xs:text-md">{sub.sub}</h2>
                    <small>{sub.terms}</small>
                  </div>
                  <div className="flex gap-4 justify-center items-center text-2xl font-bold">
                    <div>
                      {sub.marks}%
                    </div>
                    <div className="dark:text-white text-yellow-500 border-yellow-200 border-2 bg-yellow-50 dark:bg-cyan-950 w-12 h-12 rounded-full flex justify-center items-center text-3xl font-bold">
                      {sub.marks > 90 ? "A": sub.marks > 80 ? "B": sub.marks > 70 ? "C": sub.marks > 60 ? "D": sub.marks > 50 ? "E": "F"}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </div>
  )
}

export default Result