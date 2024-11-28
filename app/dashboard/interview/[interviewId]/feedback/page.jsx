'use client'

import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ArrowRight, ArrowRightLeftIcon, ChevronsDownUp, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([])
  const router = useRouter()

  useEffect(() => {
    GetFeedback()
  }, [])

  const GetFeedback = async () => {
    const result = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params?.interviewId))
      .orderBy(UserAnswer.id)

    console.log("resultedData", result)
    setFeedbackList(result)
  }

  return (

      <div className='border-b-2 py-2 space-y-3 min-h-screen p-10'>
      <h2 className='text-blue-600 font-bold text-4xl font-sans'>Congratulations</h2>
      <h2 className='font-bold text-xl md:text-3xl text-gray-950'>Here is your interview feedback</h2>

      {feedbackList?.length === 0 ? 
      
       (
        <>
        <h2 className='text-gray-500 font-semibold text-xl'>No Interview Feedback Record Found.</h2>
        <div className='mt-3 '>
        <Button 
        onClick={() => router.replace('/dashboard')}
        className="bg-blue-600 cursor-pointer hover:bg-purple-500">Go Home</Button>
       </div>
        </>
       )
       : ( <>
      <h2 className='text-blue-400 font-bold'>Your overall interview rating: <strong>7/10</strong></h2>
      <h2 className='text-sm text-gray-500 font-semibold'>
        Find below interview questions with the correct answer, your answer, and feedback for improvement.
      </h2>

      <div className='mt-10'>
        {feedbackList && feedbackList.map((item, index) => (
          <div key={index}>
            <Collapsible>
              <CollapsibleTrigger className='p-3 border rounded-xl mt-3 text-sm  font-semibold flex items-center gap-2 bg-slate-100'>{item.question} <ChevronsUpDown/></CollapsibleTrigger>
              <CollapsibleContent className='p-3 border rounded-xl bg-slate-200 mt-1'>
                <p className='p-2 border-b-2 border-black text-red-500'><strong>Rating:</strong> {item.rating}</p>
                <p className='p-2 border-b-2 border-black'><strong>Your Answer:</strong> {item.userAnswer}</p>
                <p className='p-2 border-b-2 border-black'><strong>Correct Answer:</strong> {item.correctAnswer}</p>
                <p className='p-2 border-b-2 border-black text-blue-500 '><strong>Feedback:</strong> {item.feedback}</p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
      </div>

       <div className='mt-3 '>
        <Button 
        onClick={() => router.replace('/dashboard')}
        className="bg-blue-600 cursor-pointer hover:bg-purple-500">Go Home</Button>
       </div>
      
         </>)}
     

    </div>
  )
}

export default Feedback
