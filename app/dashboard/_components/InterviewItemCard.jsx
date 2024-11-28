import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { DeleteIcon, Trash, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'


function InterviewItemCard({interview}) {
    const router = useRouter()
    const onStart = () => {
       router.push(`/dashboard/interview/${interview?.mockId}`)
    }

    const onFeedback = () => {
        router.push(`/dashboard/interview/${interview?.mockId}/feedback`)
    }

     console.log("interviewDataON---",interview)
     const deleteInterview = async () => {
      try {
          // Deleting the interview from the database
          const result = await db.delete(MockInterview)
              .where(eq(MockInterview.mockId, interview.mockId));
          
          // Show a toast notification after deletion
          toast('Interview deleted. Please refresh the page!');
          
          // Refresh the page after a short delay to allow the toast to be visible
          setTimeout(() => {
              window.location.reload(true);  // refresh the page after deletion
          }, 2000);  // delay for 2 seconds
      } catch (error) {
          console.error("Error deleting interview:", error);
          toast('Failed to delete interview. Please try again later.');
      }
  }
  
  
  return (
    <div className='border shadow-lg rounded-lg p-3  w-full bg-slate-100 '>
    <div className='flex items-center justify-between'>  <h2 className='font-bold text-blue-600 text-xl'>{interview?.jobPosition.toUpperCase()}</h2> <Trash2 onClick={deleteInterview} className='cursor-pointer text-red-600 hover:text-red-500'/></div>
      <h2 className='font-sm text-gray-600 font-semibold'>{interview?.jobExprience} Years of Experince</h2>
      <h2 className='font-sm text-gray-600'> createdAt : {interview?.createdAt} </h2>
      <h2 className='font-sm text-gray-600'> createdBy : {interview?.createdBY} </h2>

      <div className='flex gap-2 mt-2'>
        <Button 
         onClick={onFeedback}
         size='sm' variant='outline' className="w-full">Feedback</Button>
        <Button
         onClick={onStart}
         size='sm' className="bg-blue-500 hover:bg-blue-600 w-full">Start</Button>
       </div>
    </div>
  )
}

export default InterviewItemCard


