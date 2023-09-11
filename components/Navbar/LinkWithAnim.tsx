import { motion } from "framer-motion"
import Link from 'next/link';
import { usePathname } from "next/navigation";

export default function LinkWithAnim({
  children, href, className, delay = 0, showUnderLine = true, shortUnderline
}: {
  children: React.ReactNode,
  href: string,
  className?: string,
  delay?: number,
  showUnderLine?: boolean,
  shortUnderline?: boolean
}) {
  const pathname = usePathname()
  const initialOpacity = delay > 0 ? 0 : 1
  return (
    <motion.div
      className={`cursor-pointer ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: initialOpacity }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      <Link href={href}>{children}</Link>
      {showUnderLine && pathname === href
        && <div className={`bg-headingColor h-1 rounded-full -mt-0.5 ${shortUnderline ? 'w-16' : 'w-20'}`} />}
    </motion.div>
  )
}
