import { cn } from "@/lib/utils"
import { Label } from "./ui/label"
import React, { Dispatch, SetStateAction } from "react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
}

type MyInputProps = InputProps & {
  label?: string,
  bind?: {
    formData: any,
    setFormData: Dispatch<any>
  },
  desc?: string
}


const Input = React.forwardRef<HTMLInputElement, MyInputProps>(
  ({ className, type, ...props }, ref) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!props.bind) return
      const name = e.target.name
      const { formData, setFormData } = props.bind
      setFormData({ ...formData, [name]: e.target.value })
    }

    return (
      <div>
        <Label className="ml-2">{props.label}</Label>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-full border border-gray-400 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          placeholder={props.placeholder || `請輸入${props.label}`}
          value={(props.bind && props.name) && props.bind?.formData[props.name]}
          onChange={handleChange}
          {...props}
        />
        {props.desc && <span className="ml-3 -mt-1 text-xs text-gray-400">{props.desc}</span>}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input as MyInput }