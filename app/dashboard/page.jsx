import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function Dashboard() {
  return (
    <div className=' min-h-screen rounded-lg p-8'>
    
    <h2 className='text-3xl font-bold mb-4 text-blue-600'>Dashboard</h2>
     <h2 className=' text-2x font-bold text-gray-800'>Create and Start your AI Mock Interview</h2>

      <div className=' grid grid-cols-1 md:grid-col-3 my-5'>
       <AddNewInterview/>
      </div>

      <hr></hr>
      <div className=''>
        <InterviewList/>
      </div>
    </div>
  )
}

export default Dashboard