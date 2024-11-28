import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import useSpeechToText from 'react-hook-speech-to-text';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAiModel';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import Link from 'next/link';

function RecordAnswer({ mockInterviewQuestions, activeQuestionIndex, setActiveQuestionIndex, interviewData }) {
    const [userAnswer, setUserAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });

    console.log('mockQuestion', mockInterviewQuestions);
    console.log("activeQuestionIndex", activeQuestionIndex)

    useEffect(() => {
        results.forEach((result) => {
            setUserAnswer(prevAns => prevAns + result?.transcript);
        });
    }, [results]);

    useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
            updateUserAnswer();
        }
    }, [userAnswer, isRecording]);

    const startStopRecording = () => {
        if (isRecording) {
            stopSpeechToText();

            if (userAnswer.length < 10) {
                toast('Error while saving your answer, please try again');
                setLoading(false);
                return;
            }
        } else {
            startSpeechToText();
        }
    };

    const updateUserAnswer = async () => {
        console.log('>>>>', userAnswer);
        setLoading(true);

        try {
            const feedbackPrompt = `Question:${mockInterviewQuestions[activeQuestionIndex]?.question}, User Answer:${userAnswer}, Depends on question and user answer for give interview question, please give us rating for answer and feedback as area of improvement if any, in just 3 to 5 lines to improve it in JSON format with rating field and feedback field`;
            const result = await chatSession.sendMessage(feedbackPrompt);

            const mockJsonResp = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
            const JsonFeedBackResp = JSON.parse(mockJsonResp);

            const userEmail = user?.primaryEmailAddress?.emailAddress || '';
            const mockIdRef = interviewData?.mockId || '';
            const question = mockInterviewQuestions[activeQuestionIndex]?.question || 'Default Question';
            const correctAnswer = mockInterviewQuestions[activeQuestionIndex]?.answer || 'Default Answer';
            const feedback = JsonFeedBackResp?.feedback || '';
            const rating = JsonFeedBackResp?.rating || 0;

            //console.log("*****************", question, correctAnswer,)

            if (!userEmail || !mockIdRef) {
                throw new Error("Missing required user information or mock ID");
            }

            const resp = await db.insert(UserAnswer).values({
                mockIdRef: mockIdRef,
                question: question,
                correctAnswer: correctAnswer,
                userAnswer: userAnswer,
                feedback: feedback,
                rating: rating,
                userEmail: userEmail,
                createdAt: moment().format('DD-MM-YYYY'),
            });

            if (resp) {
                //console.log('dbResponse', resp);
                toast('User Answer recorded successfully');
                setResults([]);
            }
        } catch (error) {
            console.error('Error updating user answer:', error);
            toast('An error occurred while saving your answer. Please try again.');
        } finally {
            setUserAnswer('');
            setLoading(false);
            setResults([]);
        }
    };

    return (
        <div className='flex justify-center items-center flex-col gap-3 '>
       
            <div className='rounded-md flex justify-center items-center flex-col bg-slate-300 p-2'>
             <h3 className='font-bold text-xl text-blue-600'>Video</h3>
                <Webcam
                    audio={false}
                    style={{
                        width: '300px',
                        height: '300px',
                        
                    }}
                    mirrored={true}
                    className='rounded-xl'
                />
            </div>

            <Button
                disabled={loading}
                onClick={startStopRecording}
                className="bg-blue-500 text-white cursor-pointer hover:bg-blue-700"
            >
                {isRecording ? (
                    <h2 className='text-red flex items-center'>
                        <Mic /> Stop recording
                    </h2>
                ) : (
                    'Record Answer'
                )}
            </Button>

            <div className='flex gap-3 items-center '>
                {activeQuestionIndex > 0 &&
                    <Button
                      onClick={()=>setActiveQuestionIndex(activeQuestionIndex - 1)} 
                     className="bg-blue-600 hover:bg-blue-700">Previous Question</Button>
                }

                 {activeQuestionIndex !=mockInterviewQuestions?.length-1 && 
                    <Button 
                     onClick={()=>setActiveQuestionIndex(activeQuestionIndex + 1)} 
                    className="bg-blue-600 hover:bg-blue-700">Next Question</Button>
                 }
                
               

              {activeQuestionIndex === mockInterviewQuestions?.length-1 &&
                <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
                <Button 
                className="bg-blue-600">End Interview</Button>
                </Link>
               }
        </div>
        </div >
    );s
}

export default RecordAnswer;
