import { Button } from '@/components/ui/button'
import { LightbulbIcon, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionSection({ mockInterviewQuestions, setActiveQuestionIndex, activeQuestionIndex }) {

  const textToSpeech = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 1; // 0 - 1
    synth.speak(utterance);
  }
  return mockInterviewQuestions && (
    <div className='border p-5 rounded-md'>
      <div className='my-5 grid grid-cols-3 md:grid-cols-4 md:gap-5 gap-3'>
        {
          mockInterviewQuestions && mockInterviewQuestions?.map((question, index) => {

            return (

              <h2 className={`
    py-2 px-3 font-semibold
    bg-slate-300 rounded-full
    whitespace-nowrap text-sm
    text-center
    cursor-pointer
    ${activeQuestionIndex === index ? "bg-purple-700 text-white" : ""}
`}>
                Question {index + 1}
              </h2>

            )
          })}
      </div>
      <div className='flex items-center gap-3'>
        <h2 className='texl-lg'>Q. {mockInterviewQuestions[activeQuestionIndex]?.question}</h2>
        <Volume2
          className='cursor-pointer'
          onClick={() => textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.question)} />
      </div>

      <div className=' mt-10 border rounded-lg p-5 bg-blue-300 text-gray-900'>
        <h2 className='flex gap-2 items-center'>
          <LightbulbIcon />
          <strong>Note:</strong>
        </h2>
        <h2 className='text-blue-600 text-sm mt-1'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
      </div>



    </div>
  )
}

export default QuestionSection
