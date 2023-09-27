import dynamic from 'next/dynamic'
const NewDiscountBtn = dynamic(() => import('./NewDiscountDialog'))

export default function EditDiscount() {
  return (
    <div>EditDiscount</div>
  )
}
