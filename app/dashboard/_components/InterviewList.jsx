'use client'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard'
import { ArrowBigRight } from 'lucide-react'

function InterviewList() {
    const { user } = useUser()
    const [interviewList, setInterviewList] = useState([])

    useEffect(() => {
        if (user) {
            getInterviewList()
        }
    }, [user])

    const getInterviewList = async () => {
        const result = await db.select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBY, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(MockInterview.id))

        setInterviewList(result)
    }

    return (
        <div className='font-sans mt-3'>
            <h1 className='text-2xl font-medium text-gray-800'>Previous Interview List</h1>
            {
                interviewList.length > 0 ? (
                    <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 my-2 place-items-center md:place-items-start'>
                        {interviewList.map((interview, index) => (
                            <InterviewItemCard key={index} interview={interview} />
                        ))}
                    </div>
                ) : (
                    <h2 className='text-gray-900 pt-16 flex items-center justify-center'>
                        <ArrowBigRight />No any previous interview available
                    </h2>
                )
            }
        </div>
    )
}

export default InterviewList
