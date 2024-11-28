'use client'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Webcam from "react-webcam";

function Page({ params }) { // Ensure the component name is capitalized

  const [interviewData, setInterviewData] = useState()

  const [webcamEnabled, setWebcamEnabled] = useState(false)
  const getInterviewDetails = async () => {
    if (!params || !params.interviewId) {
      console.error('Interview ID is missing');
      return;
    }

    try {
      const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));


      setInterviewData(result[0]); // Assuming there's only one record for now
    } catch (error) {
      console.error('Error fetching interview details:', error);
    }
  }

  const videoConstraints = {
    width: 200,
    height: 150,
    facingMode: "user"
  };

  useEffect(() => {
    console.log(params);
    getInterviewDetails();
  }, [params]); // Include params as a dependency

  return (
    <div className='my-10'>
      <h2 className='text-2xl text-center font-bold mb-4 text-blue-600 '>Let's Get Started</h2>

      <div className='grid grid-cols-1  md:grid-cols-2  items-center justify-center border rounded-md px-3 gap-4'>

        {/* left side */}
        <div className='flex flex-col  gap-5 '>
        <div className='flex flex-col my-5  p-5 border rounded-md gap-5 bg-slate-100'>
          <h3 className='font-bold text-sm'>
            <strong>Job Role/Job Position: </strong>
            {interviewData?.jobPosition}
          </h3>
          <h3 className='font-bold text-sm'>
            <strong>Job Description/Tech Stack: </strong>
            {interviewData?.jobDescription}
          </h3>
          <h3 className='font-bold text-sm'>
            <strong>Years of Experince: </strong>
            {interviewData?.jobExprience}
          </h3>

           <div className='border bg-yellow-200 p-3 rounded-lg'>
             <h3 className='flex gap-2 items-center text-yellow-400'><Lightbulb/><strong>Information</strong></h3>
             <p className='text-sm text-orange-500'>{process.env.NEXT_PUBLIC_INFORMATION}</p>
           </div>
        </div>
        </div>
    
        {/* Right side */}
        <div className='flex md:justify-center justify-center  items-center flex-col '>
          {
            webcamEnabled ?
              <Webcam
                onUserMedia={() => setWebcamEnabled(true)}
                onUserMediaError={() => setWebcamEnabled(false)}
                height={250}
                width={300}
                videoConstraints={videoConstraints}
                className='rounded-lg bg-slate-100'
                mirrored={true}
              />
              :
              <div className='flex flex-col justify-center items-center w-full  '>
                <WebcamIcon className='mt-3 size-36 rounded-md border-black border bg-secondary  ' />
                <Button
                  onClick={() => setWebcamEnabled(true)}
                  className='mt-4 text-xs'>Enable Web Cam and Microphone</Button>
              </div>
          }
          <div className='flex justify-end'>
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
        <Button  
        className="md:mb-2 mt-4 mb-5 bg-blue-600 cursor-pointer hover:bg-blue-700">Start Interview</Button>
        </Link>
        </div>
          
        </div>
        
       
    </div>
      </div>
       


  );
}

export default Page;
