'use client'
import QuestionSection from '@/app/dashboard/_components/QuestionSection';
import RecoardAnswer from '@/app/dashboard/_components/RecoardAnswer';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useEffect, useState } from 'react';

function Page({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const getInterviewDetails = async () => {
    if (!params || !params.interviewId) {
      throw new Error('Interview ID is missing');
    }

    try {
      const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      const jsonMockRes = result[0]?.jsonMockRes;
      console.log("Raw JSON response:", jsonMockRes);

      if (jsonMockRes) {
        try {
          const cleanJsonString = jsonMockRes.split('\n').filter(line => !line.startsWith('**Note:**')).join('\n');
          const jsonMockResp = JSON.parse(cleanJsonString);
          console.log("Parsed JSON response:", jsonMockResp);
          setMockInterviewQuestions(jsonMockResp);
          setInterviewData(result[0]); // Assuming there's only one record for now
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
          console.error('Malformed JSON string:', jsonMockRes);
          throw jsonError;
        }
      } else {
        throw new Error('No interview details found for the given ID');
      }
    } catch (error) {
      console.error('Error fetching interview details:', error);
      throw error;
    }
  };

  useEffect(() => {
    console.log(params);
    getInterviewDetails();
  }, [params]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 py-5 gap-5 min-h-screen'>
      {/* Questions side */}
      <QuestionSection
        mockInterviewQuestions={mockInterviewQuestions}
        activeQuestionIndex={activeQuestionIndex}
        setActiveQuestionIndex={setActiveQuestionIndex}
      />

      {/* Video recording side */}
      <RecoardAnswer
        mockInterviewQuestions={mockInterviewQuestions}
        activeQuestionIndex={activeQuestionIndex}
        setActiveQuestionIndex={setActiveQuestionIndex}
        interviewData={interviewData}
      />
    </div>
  );
}

export default Page;
