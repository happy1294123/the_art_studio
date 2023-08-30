export default function TheTitle({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="my-title text-3xl text-headingColor font-bold my-6">{children}</div>
  )
}
