import { useSelector } from 'react-redux'
import { ChartPie, GraduationCap, IdCard, Medal } from 'lucide-react'
import type { RootState } from '@/redux/store'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Result() {
  const data = useSelector((state: RootState) => state.student.result)
  const navigate = useNavigate()

  const marks = data?.student?.marks
  const numbers = Object.values(marks || {}).filter(
    (v) => typeof v === 'number' && v !== null
  )
  const average =
    numbers.length > 0
      ? (numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(2)
      : 0

  const studentInfo = [
    { icon: GraduationCap, name: 'Name', value: data.student.name },
    { icon: IdCard, name: 'ID', value: data.student.id },
    { icon: Medal, name: 'Grade', value: data.student.marks.grade },
    { icon: ChartPie, name: 'Average', value: average + '%' },
  ]

  const itSubjects = [
    { sub: 'A+', marks: marks?.a_plus },
    { sub: 'Multimedia', marks: marks?.multimedia },
    { sub: 'Web Design', marks: marks?.web_desing },
    { sub: 'Networking', marks: marks?.networking },
    { sub: 'Database', marks: marks?.database },
    { sub: 'Programming', marks: marks?.programming },
  ]

  const computerSubjects = [
    { sub: 'Book 1', marks: marks?.book_1 },
    { sub: 'Book 2', marks: marks?.book_2 },
    { sub: 'Book 3', marks: marks?.book_3 },
    { sub: 'Networking', marks: marks?.networking },
    { sub: 'Database', marks: marks?.database },
  ]

  const subjects =
    data?.student?.subject?.toLowerCase() === 'it'
      ? itSubjects
      : computerSubjects

  useEffect(() => {
    if (!data.student) {
      navigate('/')
    }
  }, [data, navigate])

  return (
    <div className='w-full h-screen flex flex-col'>
      <Header />
      <div className='grow'>
        <div className='w-full mb-5'>
          <div className='mt-24'>
            <h2 className='w-[90%] md:w-full mx-auto text-3xl md:text-5xl font-bold text-center text-blue-500 dark:text-blue-400'>
              Your Academic Results
            </h2>

            {/* Student info */}
            <div className='w-[90%] mx-auto my-10 p-6 bg-gray-100 dark:bg-gray-800/70 rounded-xl shadow-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
              {studentInfo.map((student, i) => (
                <div
                  key={i}
                  className='flex flex-col items-center bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg p-4 hover:scale-105 transition-transform duration-300 shadow-md'
                >
                  <student.icon className='text-blue-500 dark:text-blue-400 w-8 h-8 md:w-10 md:h-10 mb-2' />
                  <p className='text-gray-500 dark:text-gray-300 text-xs md:text-sm'>
                    {student.name}
                  </p>
                  <h2 className='font-semibold text-sm md:text-lg mt-1 text-gray-800 dark:text-gray-100 text-center'>
                    {student.value}
                  </h2>
                </div>
              ))}
            </div>

            {/* Subjects list */}
            <div className='w-[90%] flex flex-col gap-4 m-auto relative p-5 bg-gray-100 dark:bg-gray-800/70 rounded-lg'>
              <header>
                <h2 className='text-xl md:text-3xl font-medium'>
                  Subject Results
                </h2>
                <p className='text-sm sm:text-md'>
                  Your performance across all subjects
                </p>
              </header>

              {subjects
                .filter((s) => s.marks !== null && s.marks !== undefined)
                .map((sub, index) => (
                  <div
                    key={index}
                    className='dark:hover:bg-cyan-950 dark:hover:border-cyan-600 hover:bg-yellow-50 hover:border-yellow-300 w-full py-1 px-5 rounded-md border dark:border-gray-800 border-gray-200'
                  >
                    <div className='flex justify-between items-center'>
                      <div className='flex flex-col'>
                        <h2 className='font-medium text-lg md:text-2xl'>
                          {sub.sub}
                        </h2>
                      </div>
                      <div className='flex gap-4 justify-center items-center text-lg md:text-2xl font-bold'>
                        <div>{sub.marks ?? 0}%</div>
                        <div className='dark:text-white text-yellow-500 border-yellow-200 border-2 bg-yellow-50 dark:bg-cyan-950 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex justify-center items-center text-xl md:text-3xl font-bold'>
                          {(sub.marks ?? 0) > 90
                            ? 'A'
                            : (sub.marks ?? 0) > 80
                            ? 'B'
                            : (sub.marks ?? 0) > 70
                            ? 'C'
                            : (sub.marks ?? 0) > 60
                            ? 'D'
                            : (sub.marks ?? 0) > 50
                            ? 'E'
                            : 'F'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Result
