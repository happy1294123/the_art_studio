import { MyCourse, Teacher } from "@/type";
import { CourseType, User } from "@prisma/client";
import { KeyedMutator } from "swr";
import { createContext, useContext } from "react";

export const CourseContent = createContext<{
  courses?: MyCourse[],
  coursesMutate?: KeyedMutator<MyCourse[]>,
  courseType?: CourseType[],
  courseTypeMutate?: KeyedMutator<CourseType[]>,
  teacherOpt?: Teacher[],
  users?: Partial<User>[]
} | undefined>(undefined)

export const useCourse = () => {
  const content = useContext(CourseContent)
  if (!content) {
    throw new Error('Course content error.')
  }

  return {
    courses: content.courses,
    coursesMutate: content.coursesMutate,
    courseType: content.courseType,
    courseTypeMutate: content.courseTypeMutate,
    teacherOpt: content.teacherOpt,
    users: content.users
  }
}