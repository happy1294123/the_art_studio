import { motion } from "framer-motion"
import Link from 'next/link';

export default function LinkWithAnim({
  children, href, className
}: {
  children: React.ReactNode,
  href: string,
  className?: string
}) {
  return (
    <motion.div
      className={`cursor-pointer ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}>
      <Link href={href}>{children}</Link>
    </motion.div>
  )
}
