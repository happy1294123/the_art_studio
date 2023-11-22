import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import getToastOption from "@/lib/getToastOption"
import { Payment } from "@prisma/client"
import { Dispatch, useState } from "react"
import toast from "react-hot-toast"
import { KeyedMutator } from "swr"
import LoadingButton from "@/components/LoadingButton"

type props = {
  openDialog: boolean,
  setOpenDialog: Dispatch<boolean>,
  payment: Payment,
  paymentMutator: KeyedMutator<Payment>
}

export default function ReplyDialog({ openDialog, setOpenDialog, payment, paymentMutator }: props) {
  const [isLoading, setIsLoading] = useState(false)
  const handleReply = async (reply: string) => {
    setIsLoading(true)
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
      const message = await res.json()
      toast(message || '回覆失敗', getToastOption('error'))
    }
    setIsLoading(false)
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-center">回覆收款</DialogTitle>
          <DialogDescription>
            <div className="flex gap-4 mt-4">
              <LoadingButton
                isLoading={isLoading}
                className="w-full"
                onClick={() => handleReply('success')}
                disabledWhileLoading
              >已收到</LoadingButton>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog >
  )
}
