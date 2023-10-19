import { JSX } from 'react'
import { AiFillInfoCircle, AiFillCheckCircle } from 'react-icons/ai'
import { BiSolidError } from 'react-icons/bi'

const getIcon = (iconFlag?: string | JSX.Element) => {
  if (iconFlag === 'info') {
    return <AiFillInfoCircle className="my-auto text-xl" />
  }
  if (iconFlag === 'error') {
    return <BiSolidError className="my-auto text-xl ml-1" />
  }
  // default success
  return <AiFillCheckCircle className="my-auto text-xl" />
}

export default function getToastOption(icon?: string | JSX.Element | undefined, mode = 'light') {
  if (mode === 'dark') {
    return {
      icon: getIcon(icon),
      style: {
        borderRadius: '20px',
        backgroundColor: '#D1C0AD',
        color: '#6C370D',
      }
    }
  } else if (mode === 'light') {
    return {
      icon: getIcon(icon),
      style: {
        borderRadius: '30px',
        backgroundColor: '#FFF5ED',
        color: '#6C370D',
        border: '2px solid #D1C0AD'
      }
    }
  }
}
