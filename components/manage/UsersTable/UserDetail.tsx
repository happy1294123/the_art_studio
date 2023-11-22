import getUserInfo from '@/lib/manage/getUserInfo';
import { User } from '@prisma/client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Label } from '@/components/ui/label';

export default function UserDetail({ user }: { user: User }) {
  const { userInfo, userDetail, userEmDetail } = getUserInfo(user);

  return (
    <div>
      <div className="overflow-y-auto max-h-[500px]">
        {userInfo.map(data => (
          <div key={data.field} className="grid md:grid-cols-5 mt-2 items-center">
            <Label className="whitespace-nowrap col-span-1">{data.field}:</Label>
            <span className="ml-4 md:ml-0 text-fontColor/60">{String(data.value)}</span>
          </div>
        ))}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex justify-start text-sm outline-none pb-1">更多資料</AccordionTrigger>
            <AccordionContent>
              {userDetail.map(data => (
                <div key={data.field} className="grid md:grid-cols-5 mt-2 items-center">
                  <Label className="whitespace-nowrap col-span-1">{data.field}:</Label>
                  <span className="md:whitespace-nowrap ml-4 md:ml-0 text-fontColor/80 ">{String(data.value)}</span>
                </div>
              ))}
              <div className="mt-4">
                <span className="whitespace-nowrap">緊急聯絡人</span>
                {userEmDetail.map(data => (
                  <div key={data.field} className="grid md:grid-cols-5 mt-2 items-center">
                    <Label className="whitespace-nowrap col-span-1">{data.field}:</Label>
                    <span className="md:whitespace-nowrap ml-4 md:ml-0 text-fontColor/60">{String(data.value)}</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
