import { createContext } from "react";

export const TestContent = createContext<{
  color: string,
  name: string
} | undefined>(undefined)