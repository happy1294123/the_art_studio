import { Switch } from '@/components/ui/switch'
import { Dispatch } from 'react'

type Props = {
  label: string,
  status: boolean,
  setStatus: Dispatch<boolean>
}

export default function DialogSwitcher({ label, status, setStatus }: Props) {
  return (
    <div className="absolute right-9 top-3 flex items-baseline gap-1">
      <label htmlFor='dialog-switcher' className="text-sm text-fontColor/60">{label}</label>
      <Switch id="dialog-switcher" defaultChecked={status} onCheckedChange={(check: boolean) => setStatus(check)} />
    </div>
  )
}
