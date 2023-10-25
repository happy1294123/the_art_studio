import React, { Dispatch, useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CourseType } from '@prisma/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import getToastOption from '@/lib/getToastOption'
import { KeyedMutator } from 'swr'

type Props = {
  openDialog: boolean,
  setOpenDialog: Dispatch<boolean>,
  courseType: CourseType[],
  courseTypeMutate: KeyedMutator<CourseType[]>
}

export default function CourseTypeDialog({ openDialog, setOpenDialog, courseType, courseTypeMutate }: Props) {
  const [allType, setAllType] = useState<Record<number | string, string>>()
  const [allCourseType, setAllCourseType] = useState(courseType)
  useEffect(() => {
    const allType: Record<number | string, string> = {}
    allCourseType.forEach(type => {
      allType[type.id] = type.color
    })
    setAllType(allType)
  }, [allCourseType])
  const [newType, setNewType] = useState<{ name: string, color: string }[]>()
  const [deleteId, setDeleteId] = useState<number[]>()

  const handleChangeType = (typeId: number, value: string) => {
    setAllType(prev => ({ ...prev, [typeId]: value }))
  }

  const handleDelete = (typeId: number) => {
    if (allCourseType.find(t => t.id === typeId)) {
      const newDeleteId = deleteId ? [...deleteId, typeId] : [typeId]
      setDeleteId(newDeleteId)
    }
    setAllCourseType(allCourseType.filter(type => type.id !== typeId))
  }

  const handleAdd = () => {
    setNewType(prev => {
      if (prev) return [...prev, { name: '', color: '' }]
      return [{ name: '', color: '' }]
    })
  }

  const handleChangeAdd = (field: string, index: number, value: string) => {
    if (newType) {
      const newAddType = newType.map((type, i) => {
        if (i === index) {
          return { ...type, [field]: value }
        }
        return type
      })
      setNewType(newAddType)
    }
  }

  const handleDeleteAdd = (index: number) => {
    if (newType) {
      setNewType(newType.filter((_, i) => i !== index))
    }
  }

  const handleSave = async () => {
    const updateRes = await fetch('/api/manage/course/type', {
      method: 'PUT',
      body: JSON.stringify(allType)
    })
    if (!updateRes.ok) {
      toast('發生錯誤', getToastOption('error'))
      return
    }
    if (newType?.length) {
      const addRess = await fetch('/api/manage/course/type', {
        method: 'POST',
        body: JSON.stringify(newType)
      })
      if (!addRess.ok) {
        toast('發生錯誤', getToastOption('error'))
        return
      }
    }
    if (deleteId?.length) {
      const deleteRes = await fetch('/api/manage/course/type', {
        method: 'DELETE',
        body: JSON.stringify(deleteId)
      })
      if (!deleteRes.ok) {
        toast('發生錯誤', getToastOption('error'))
        return
      }
    }

    toast('儲存變更成功', getToastOption())
    setOpenDialog(false)
    courseTypeMutate()
  }

  return (<>
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle>課程種類</DialogTitle>
          <DialogDescription className='text-black'>
            <div>
              <div className="grid grid-cols-5">
                <div className='col-span-2 text-headingColor text-center'>名稱</div>
                <div className='col-span-2 text-headingColor text-center'>色號</div>
                <div className='col-span-1 text-headingColor text-center'></div>
              </div>
              {allType && allCourseType.map(type => (<div key={type.name} className='grid grid-cols-5 my-1 gap-1'>
                <div className='col-span-2 flex-center'>
                  <span>
                    {type.name}
                  </span>
                </div>
                <div className='col-span-2'>
                  <Input
                    className='rounded-full border-gray-400 text-center'
                    value={allType[type.id]}
                    onChange={(e) => handleChangeType(type.id, e.target.value)}
                    style={{ backgroundColor: allType[type.id] }}
                  />
                </div>
                <div className='col-span-1 flex-center'>
                  <Button variant="secondary" onClick={() => handleDelete(type.id)}>刪除</Button>
                </div>
              </div>))}

              {newType?.map((type, i) => (<div key={i} className='grid grid-cols-5 my-1 gap-1'>
                <div className='col-span-2 flex-center'>
                  <Input className='rounded-full border-gray-400 text-center' value={type.name} onChange={e => handleChangeAdd('name', i, e.target.value)} />
                </div>
                <div className='col-span-2'>
                  <Input
                    className='rounded-full border-gray-400 text-center'
                    value={type.color}
                    onChange={e => handleChangeAdd('color', i, e.target.value)}
                    style={{ backgroundColor: type.color }}
                  />
                </div>
                <div className='col-span-1 flex-center'>
                  <Button variant="secondary" onClick={() => handleDeleteAdd(i)}>刪除</Button>
                </div>
              </div>))}
            </div>

            <Button className='float-right mt-3' onClick={handleSave}>儲存變更</Button>
            <Button variant="secondary" className='float-right mt-3 mr-2' onClick={handleAdd}>新增種類</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent >
    </Dialog >
  </>)
}
