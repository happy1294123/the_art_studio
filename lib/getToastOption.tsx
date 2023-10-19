import { JSX } from 'react'
import { AiFillInfoCircle, AiFillCheckCircle } from 'react-icons/ai'
import { BiSolidError } from 'react-icons/bi'

const getIcon = (iconFlag?: string | JSX.Element) => {
  if (iconFlag === 'success') {
    return <AiFillCheckCircle className="my-auto text-xl" />
  }
  if (iconFlag === 'error') {
    return <BiSolidError className="my-auto text-xl ml-1" />
  }
  return <AiFillInfoCircle className="my-auto text-xl" />
}

export default function getToastOption(mode = 'light', icon?: string | JSX.Element | undefined) {
  // if (!icon) {
  //   icon = <AiFillInfoCircle className="my-auto text-xl" />
  // }
  // if (icon = 'success') {
  //   icon = <AiFillCheckCircle className="my-auto text-xl" />
  // }
  // if (icon = 'error') {
  //   icon = <BiSolidError className="my-auto text-xl ml-1" />
  // }

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
