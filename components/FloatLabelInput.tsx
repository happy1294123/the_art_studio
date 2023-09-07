import React from "react";
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  name?: string,
  className?: string;
  error?: string;
  type?: string
}
// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, IProps>(
  ({ labelText, name, className, error, type = 'text', ...props }, ref) => {
    return (
      <>
        <div
          className={`${className} ${error && "animate-shake"
            } relative border-b-2 border-b-headingColor w-[300px] inline-flex justify-center`}
        >
          <input
            ref={ref}
            {...props}
            className="bg-bgColorSecondary w-full h-6 outline-none focus:ring-0 focus:border-none border-transparent focus:border-transparent peer"
            type={type}
            name={name}
            placeholder=" "
          />
          <div className="border-headingColor absolute top-full transition-all duration-300 bg-bgColorOther w-0 h-0.5 peer-focus:w-full"></div>
          <label className={`absolute pointer-events-none -top-5 ${labelText?.length === 2 ? '-left-2 peer-focus:-left-2' : '-left-3 peer-focus:-left-3'} transition-all bg-bgColorSecondary scale-75 px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:-top-1 peer-placeholder-shown:left-11 peer-placeholder-shown:text-fontColor/60 peer-focus:-top-6 peer-focus:scale-75 peer-focus:text-fontColor/60`}>
            {labelText}
          </label>
          <span className="absolute left-0 -top-1 transition-all duration-300 hidden peer-focus:hidden peer-placeholder-shown:block peer-placeholder-shown:text-fontColor/60">請輸入</span>
        </div>
        {error && (
          <p className={`${error && "animate-shake"} text-primary/80`}>
            {error}
          </p>
        )}
      </>
    );
  }
);

export default Input;