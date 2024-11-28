'use client'
import  { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAiModel';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { uuid } from 'drizzle-orm/pg-core';
import { useRouter } from 'next/navigation';



function AddNewInterview() {
     const [openDialog, setOpenDialog] = useState(false);
     const [jobPosition, setJobPosition] = useState('');
     const [yearsOfExperience, setYearsOfExperience] = useState('');
     const [jobDescription, setJobDescription] = useState('');
     const [loadings, setLoadings] = useState(false)
     const [jsonResponses, setJSONResponses] = useState([])


     const router = useRouter();

     const {user} = useUser();
     const formSubmit = async(e)=>{
        e.preventDefault();
        setLoadings(true);
        
        const inputPromt = `Job Position: ${jobPosition}. Job Description: ${jobDescription}, years of experience: ${yearsOfExperience}. Based on this information, please give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUSTION_COUNT} interview questions with answers in JSON format.  give question and answer as fields in JSON.`;
        console.log(inputPromt);
    
        try {
            const result = await chatSession.sendMessage(inputPromt);
            let geminiResponse = await result.response.text();
    
            // Remove code block markers
            geminiResponse = geminiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    
            // Log and parse the JSON
            //console.log("geminiResponse>>>>>", geminiResponse);
            //const parsedResponse = JSON.parse(geminiResponse);
            //console.log(">>>>>>>>>>",parsedResponse);
            setJSONResponses(geminiResponse)

            if(geminiResponse){
            const resp = await db.insert(MockInterview)
            .values({
                mockId:uuidv4(),
                jsonMockRes: geminiResponse,
                jobPosition: jobPosition,
                jobExprience: yearsOfExperience,
                jobDescription: jobDescription,
                createdBY: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-YYYY'),
            }).returning({mockId:MockInterview.mockId})
             
             if(result){
                setOpenDialog(false)
                router.push(`/dashboard/interview/${resp[0].mockId}`)
             }
        }else{
            console.error('Failed to send message:', error);
        }

        } catch (error) {
            console.error('Error parsing JSON response:', error);
        }
    }
    
    return (
        <div className=''>
            <div 
             onClick={()=> setOpenDialog(true)}
            className='text-blue-600 flex items-center justify-center font-bold cursor-pointer w-[200px] h-[80px] p-2 rounded-lg border border-black bg-slate-100 hover:shadow-lg transition ease-in '>
                + Add New Interview
            </div>

            <div className="">
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle
                        className="text-xl mb-3 text-blue-600"
                        >Tell us more about Job you are interviewing</DialogTitle>
                        <DialogDescription>
                             <p>Add Details about job position, Your skills and Year of expreience</p>
                                <form onSubmit={formSubmit}>
                              <div className='my-4 flex flex-col'>
                                 <label className=' mb-1 font-bold text-gray-900'>Job Position / Role naem</label>
                                 <input 
                                 className='border p-1 rounded-md text-black'
                                 onChange={(e)=> setJobPosition(e.target.value)}
                                 type='text' placeholder='Job Position' required/><br/>

                                 <label className=' mb-1 font-bold text-gray-900'>Job Description / Tech Stack in Short</label>
                                 <Textarea className='border p-1 rounded-md text-black' 
                                  placeholder="Description"
                                  onChange={(e)=> setJobDescription(e.target.value)}required/>

                                 <label className=' mb-1 mt-2 font-bold text-gray-900'>No of Year Experince</label>
                                 <input 
                                 className='border p-1 rounded-md text-black'
                                 required
                                 onChange={(e)=> setYearsOfExperience(e.target.value)}
                                 max="50"
                                 type='text' placeholder='eg:1 Year'/>
                              </div>

                            <div className='my-4 flex gap-3'>
                                <Button
                                 variant="ghost"
                                 onClick={()=> setOpenDialog(false)}>Cancel</Button>
                                
                                <Button
                                 className='bg-blue-700 hover:bg-blue-700'
                                 type="submit"
                                 disabled={loadings}>
                                 {
                                  loadings ?
                                 <>
                                 <LoaderCircle className='animate-spin' />'Generating from AI' </>: 'Start Interview'
                                 }
                                </Button>
                            </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            </div>
        </div>

    )
}

export default AddNewInterview