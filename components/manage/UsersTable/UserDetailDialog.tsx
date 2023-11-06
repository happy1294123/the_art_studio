import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { User } from "@prisma/client"
import { Dispatch, useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import getUserInfo from "@/lib/manage/getUserInfo"
import dateFormatter from "@/lib/dateFormatter"
import { Textarea } from "@/components/ui/textarea"
import LoadingButton from "@/components/LoadingButton"
import toast from "react-hot-toast"
import getToastOption from "@/lib/getToastOption"
import { KeyedMutator } from "swr"

const formSchema = z.object({
  serial_number: z.string(),
  point: z.coerce.number(),
  point_deadline: z.string(),
  email_varified: z.string(),
  note: z.string(),
})

type Props = {
  selectedUser: User,
  setSelectedUser: Dispatch<User | undefined>,
  userMutate: KeyedMutator<User>
}

export default function UserDetailDialog({ selectedUser, setSelectedUser, userMutate }: Props) {
  const [open, setOpen] = useState(!!selectedUser)
  useEffect(() => {
    if (!open) {
      setSelectedUser(undefined)
    }
  }, [open, setSelectedUser])

  const [showInfo, setShowInfo] = useState(true)
  const { userInfo, userDetail, userEmDetail } = getUserInfo(selectedUser)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serial_number: String(selectedUser.serial_number || ''),
      point: selectedUser.point,
      point_deadline: selectedUser.point_deadline ? dateFormatter(new Date(selectedUser.point_deadline as unknown as string), '-') : '',
      email_varified: selectedUser.email_varified ? 'true' : 'false',
      note: selectedUser.note || '',
    }
  })

  const [loading, setLoading] = useState(false)
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)

    const res = await fetch('/api/manage/users', {
      method: 'POST',
      body: JSON.stringify({
        id: selectedUser.id,
        serial_number: values.serial_number,
        point: values.point,
        point_deadline: new Date(values.point_deadline),
        email_varified: values.email_varified === 'true',
        note: values.note || '',
      })
    })

    if (res.ok) {
      toast('更新成功', getToastOption())
      const newUser = await res.json()
      userMutate()
      setSelectedUser(newUser)
    } else {
      toast('更新失敗', getToastOption('error'))
    }
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white overflow-y-auto">
        <DialogHeader>
          <div className="absolute right-9 top-3 flex items-baseline gap-1">
            <span className="text-sm text-fontColor/60">資料/更新</span>
            <Switch onCheckedChange={(check: boolean) => setShowInfo(!check)} />
          </div>
          <DialogTitle className="text-left">會員資料</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        {showInfo ? (
          <div>
            {userInfo.map(data => (
              <div key={data.field} className="grid md:grid-cols-5 mt-2 items-center">
                <Label className="whitespace-nowrap col-span-1 text-fontColor/60">{data.field}:</Label>
                <span>{String(data.value)}</span>
              </div>
            ))}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex justify-start text-sm outline-none text-fontColor/80 pb-1">更多資料</AccordionTrigger>
                <AccordionContent>
                  {userDetail.map(data => (
                    <div key={data.field} className="grid md:grid-cols-5 mt-2 items-center">
                      <Label className="whitespace-nowrap col-span-1 text-fontColor/60">{data.field}:</Label>
                      <span className="md:whitespace-nowrap">{String(data.value)}</span>
                    </div>
                  ))}
                  <div className="mt-4">
                    <span className="whitespace-nowrap text-fontColor/60">緊急聯絡人</span>
                    {userEmDetail.map(data => (
                      <div key={data.field} className="grid md:grid-cols-5 mt-2 items-center">
                        <Label className="whitespace-nowrap col-span-1 text-fontColor/60">{data.field}:</Label>
                        <span className="md:whitespace-nowrap">{String(data.value)}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {/* <Button>更新資料</Button> */}
          </div>
        )
          : (
            <>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
                  <FormField
                    control={form.control}
                    name='serial_number'
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <FormLabel>編號</FormLabel>
                        <FormControl>
                          <Input
                            className="border-gray-400"
                            placeholder="請輸入編號"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='point'
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <FormLabel>點數</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="border-gray-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='point_deadline'
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <FormLabel>點數期限</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="border-gray-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='email_varified'
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <FormLabel >信箱驗證</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-gray-400">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white rounded-2xl">
                            <SelectItem value='true'>成功</SelectItem>
                            <SelectItem value='false'>尚未</SelectItem>
                          </SelectContent>
                        </Select>
                        {/* <FormDescription>
                          You can manage email addresses in your{" "}
                          <Link href="/examples/forms">email settings</Link>.
                        </FormDescription>
                        <FormMessage /> */}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='note'
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <FormLabel>備註</FormLabel>
                        <FormControl>
                          <Textarea
                            className="border-gray-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <LoadingButton isLoading={loading} className="w-full text-lg h-10">更新資料</LoadingButton>
                </form>
              </Form>
            </>
          )}
      </DialogContent>
    </Dialog>

  )
}