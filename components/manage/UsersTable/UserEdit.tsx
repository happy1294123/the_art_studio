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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import dateFormatter from "@/lib/dateFormatter"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"
import toast from "react-hot-toast"
import getToastOption from "@/lib/getToastOption"
import LoadingButton from "@/components/LoadingButton"
import { Textarea } from "@/components/ui/textarea"
import { Dispatch, useState } from "react"
import { KeyedMutator } from "swr"
import { useSession } from "next-auth/react"

const formSchema = z.object({
  serial_number: z.string(),
  point: z.coerce.number(),
  point_deadline: z.string(),
  email_varified: z.string(),
  note: z.string(),
})

type Props = {
  user: User
  setRowAction: Dispatch<{ action: string, data: User, open: boolean }>,
  userMutate: KeyedMutator<User[]>
}

export default function UserEdit({ user, setRowAction, userMutate }: Props) {
  const { data: session } = useSession()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serial_number: String(user.serial_number || ''),
      point: user.point,
      point_deadline: user.point_deadline ? dateFormatter(new Date(user.point_deadline as unknown as string), '-') : '',
      email_varified: user.email_varified ? 'true' : 'false',
      note: user.note || '',
    }
  })

  const [loading, setLoading] = useState(false)
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)

    const res = await fetch('/api/manage/users', {
      method: 'PUT',
      body: JSON.stringify({
        id: user.id,
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
      setRowAction({ data: newUser, open: true, action: 'edit' })
      // setSelectedUser(newUser)
    } else {
      const error = await res.json()
      toast(error || '更新失敗', getToastOption('error'))
    }
    setLoading(false)
  }

  return (
    <div>
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
          {session?.user.role === 'ADMIN' && (<>
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
          </>)}
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
    </div>
  )
}
