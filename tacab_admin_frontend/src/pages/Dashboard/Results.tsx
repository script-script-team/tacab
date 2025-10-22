import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { MdDelete } from "react-icons/md";
import { TbEyeClosed } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { PickDate } from "@/components/ui/date";
import { useState } from "react";

dayjs.extend(relativeTime);

function Results() {

  const data = [
    {
      uploadId: "#464389",
      term: "11",
      year: new Date().getFullYear(),
      uploadedBy: "Mustafa",
      date: new Date("2025-6-1"),
    },
    {
      uploadId: "#465589",
      term: "10",
      year: new Date().getFullYear(),
      uploadedBy: "Suhayb",
      date: new Date("2025-1-1"),
    },
    {
      uploadId: "#462289",
      term: "9",
      year: new Date(new Date().getFullYear(), new Date().getMonth() - 12, 1).getFullYear(),
      uploadedBy: "Nimcaan",
      date: new Date("2024-6-1"),
    },
    {
      uploadId: "#461189",
      term: "8",
      year: new Date(new Date().getFullYear(), new Date().getMonth() - 12, 1).getFullYear(),
      uploadedBy: "Sumaya",
      date: new Date("2024-1-1"),
    },
    {
      uploadId: "#466689",
      term: "7",
      year: new Date(new Date().getFullYear(), new Date().getMonth() - 24, 1).getFullYear(),
      uploadedBy: "Xafsa",
      date: new Date("2023-6-1"),
    },
    {
      uploadId: "#468889",
      term: "6",
      year: new Date(new Date().getFullYear(), new Date().getMonth() - 24, 1).getFullYear(),
      uploadedBy: "Maxamed",
      date: new Date("2023-1-1"),
    },
    {
      uploadId: "#464119",
      term: "5",
      year: new Date(new Date().getFullYear(), new Date().getMonth() - 36, 1).getFullYear(),
      uploadedBy: "Yonis",
      date: new Date("2022-6-1"),
    },
    {
      uploadId: "#460089",
      term: "4",
      year: new Date(new Date().getFullYear(), new Date().getMonth() - 36, 1).getFullYear(),
      uploadedBy: "Cabaas",
      date: new Date("2022-1-1"),
    },
    {
      uploadId: "#433389",
      term: "3",
      year: new Date(new Date().getFullYear(), new Date().getMonth() - 48, 1).getFullYear(),
      uploadedBy: "Mukhtaar",
      date: new Date("2021-6-1"),
    },
    {
      uploadId: "#444389",
      term: "2",
      year: new Date(new Date().getFullYear(), new Date().getMonth() - 48, 1).getFullYear(),
      uploadedBy: "Sidiiq",
      date: new Date("2021-1-1"),
    },
    {
      uploadId: "#444444",
      term: "1",
      year: new Date(new Date().getFullYear(), new Date().getMonth() - 60, 1).getFullYear(),
      uploadedBy: "Muniir",
      date: new Date("2020-6-1"),
    },
  ]
  
  const [date, setDate] = useState<Date | undefined>(undefined)

  const pickDateFillter = date ? data.filter((d) => d.year === date.getFullYear()): data

  return (
    <div className="w-full rounded-lg p-4 bg-white dark:bg-gray-950">
      <PickDate date={date} setDate={setDate} />
      <Table>
  <TableCaption>A list of your manage uploads.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Upload Id</TableHead>
      <TableHead>Term</TableHead>
      <TableHead>Year</TableHead>
      <TableHead>Uploaded By</TableHead>
      <TableHead>Date</TableHead>
      <TableHead>Action</TableHead>
    </TableRow>
    </TableHeader>
  <TableBody>
    {pickDateFillter.map((d, i) => {
      return <TableRow key={i}>
      <TableCell className="font-medium">{d.uploadId}</TableCell>
      <TableCell>{d.term}</TableCell>
      <TableCell>{d.year}</TableCell>
      <TableCell>{d.uploadedBy}</TableCell>
      <TableCell>{dayjs(d.date).fromNow()}</TableCell>
      <TableCell className="flex gap-2">
      <TbEyeClosed className="cursor-pointer" />
      <MdDelete className="cursor-pointer text-red-500" />
      <FiEdit className="cursor-pointer text-yellow-500" />
      </TableCell>
    </TableRow>
    })}
  </TableBody>
</Table>
    </div>
  )
}

export default Results