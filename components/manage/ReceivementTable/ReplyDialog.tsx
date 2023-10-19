import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import getToastOption from "@/lib/getToastOption"
import { Payment } from "@prisma/client"
import { Dispatch } from "react"
import toast from "react-hot-toast"
import { KeyedMutator } from "swr"

type props = {
  openDialog: boolean,
  setOpenDialog: Dispatch<boolean>,
  payment: Payment,
  paymentMutator: KeyedMutator<Payment>
}

export default function ReplyDialog({ openDialog, setOpenDialog, payment, paymentMutator }: props) {
  const handleReply = async (reply: string) => {
    const res = await fetch('/api/manage/receivement', {
      method: 'POST',
      body: JSON.stringify({
        reply,
        payment_id: payment.id
      })
    })

    if (res.ok) {
      toast('回覆成功', getToastOption())
      paymentMutator()
      setOpenDialog(false)
    } else {
      toast('回覆失敗', getToastOption('error'))
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-center">回覆收款</DialogTitle>
          <DialogDescription>
            <div className="flex gap-4 mt-4">
              <Button variant="secondary" className="w-full" onClick={() => handleReply('error')}>有誤</Button>
              <Button className="w-full" onClick={() => handleReply('success')}>正確</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog >
  )
}
