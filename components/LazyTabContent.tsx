import { PropsWithChildren, useRef } from "react"

type Props = {
  show: boolean
}

export default function LazyTabContent({ show, children }: PropsWithChildren<Props>) {
  const rendered = useRef(show)

  if (show && !rendered.current) {
    rendered.current = true;
  }

  if (!rendered.current) return null;

  return (
    <div>{children}</div>
  )
}
