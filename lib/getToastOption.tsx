import { JSX } from 'react'
import { AiFillInfoCircle } from 'react-icons/ai'
import { BiSolidError } from 'react-icons/bi'

export default function getToastOption(mode = 'light', icon?: string | JSX.Element | undefined) {
  if (!icon) {
    icon = <AiFillInfoCircle className="my-auto text-xl" />
  } else if (icon = 'error') {
    icon = <BiSolidError className="my-auto text-xl" />
  }

  if (mode === 'dark') {
    return {
      icon,
      style: {
        borderRadius: '20px',
        backgroundColor: '#D1C0AD',
        color: '#6C370D',
      }
    }
  } else if (mode === 'light') {
    return {
      icon,
      style: {
        borderRadius: '30px',
        backgroundColor: '#FFF5ED',
        color: '#6C370D',
        border: '2px solid #D1C0AD'
      }
    }
  }
}
