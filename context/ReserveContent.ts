import { MyCourseFilter } from "@/type";
import { Dispatch, SetStateAction, createContext, useContext } from "react";

export const ReserveContent = createContext<{
  filter: MyCourseFilter,
  setFilter: Dispatch<SetStateAction<MyCourseFilter>>,
  selectedDate: Date,
  setSelectedDate: Dispatch<SetStateAction<Date>>,
  dateSet: string[],
  staticSchedulePath: string

} | undefined>(undefined)

export const useReserveContent = () => {
  const reserve = useContext(ReserveContent)
  if (!reserve) {
    throw new Error('Reserve content error.')
  }

  return {
    filter: reserve.filter,
    setFilter: reserve.setFilter,
    selectedDate: reserve.selectedDate,
    setSelectedDate: reserve.setSelectedDate,
    dateSet: reserve.dateSet,
    staticSchedulePath: reserve.staticSchedulePath
  }
}