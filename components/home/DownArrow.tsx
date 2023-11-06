'use client'
import React from 'react'
import { BsChevronDown } from 'react-icons/bs'

export default function downArrow() {
  const handleScroll = () => {
    const div = document.getElementById('start')
    div?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <BsChevronDown
        fontSize={20}
        className="animate-bounce mt-[300px] md:mt-[400px] cursor-pointer"
        fill="#947964"
        onClick={handleScroll}
      />
    </div>
  )
}
