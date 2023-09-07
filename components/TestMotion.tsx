'use client'
import { motion } from "framer-motion"
import { useState } from "react"

const tabs: string[] = [
  'world', 'N.Y.', 'business', 'arts', 'science'
]

export default function TestMotion() {
  const [active, setActive] = useState(tabs[0])

  return (
    <>
      <div className="bg-slate-600 p-5">
        {
          tabs.map((t: string) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`
          ${active === t ? '' : 'hover:opacity-50'}
          relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-2 outline-sky-400 focus-visible::outline
        `}>
              {active === t && (
                <motion.div
                  layoutId="active-pill"
                  transition={{ type: 'spring', bounce: 0.5 }}
                  className="absolute inset-0 rounded-full bg-blue-500" />
              )}

              <span className="relative z-10">{t}</span>
            </button>
          ))
        }
      </div>
    </>
  )
}
