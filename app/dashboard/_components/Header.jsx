'use client';
import { UserButton } from '@clerk/nextjs'
import { flightRouterStateSchema } from 'next/dist/server/app-render/types';
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function Header() {
  const path = usePathname();

   const [isOpen, setIsOpen] = useState(false)


   const toggle = ()=>{
     setIsOpen(!isOpen)
   }

   const closeMenu = ()=>{
     setIsOpen(false)
   }
  useEffect(()=>{
    console.log(path);
  },[])
  return (
    <div className='bg-blue-500 text-white flex p-4 items-center justify-between  shadow-md'>
      {/* <Image src={'/logo.svg'} width={100} height={60} alt='logo'/> */}
      <Link href={'/dashboard'}>
      <h2 className='text-2xl font-bold text-white  p-2'>Interview-Room</h2>
      </Link>

       <ul className='hidden md:flex gap-4'>
          <Link href={`/dashboard`}>
          <li
          className={` hover:text-gray-800 transition-color cursor-pointer
          ${path=='/dashboard' && 'text-gray-800 font-bold'}
          `}
         >Dashboard</li>
          </Link>
        
          <Link href={`/dashboard/contact`}>
         <li
         className={`hover:text-blue-800 hover:font-bold transition-color cursor-pointer
          ${path=='/dashboard/contact' && 'text-gray-800 font-bold'}
          `}
         >Contact Us</li>
         </Link>

         <Link href={`/dashboard/questions`}>
         <li
         className={`hover:text-blue-800 hover:font-bold transition-color cursor-pointer
          ${path=='/dashboard/questions' && 'text-gray-800 font-bold'}
          `}
         >Questions/Answer</li>
         </Link>

         <Link href={`/dashboard/how`}>
         <li
        className={`hover:text-blue-800 hover:font-bold transition-color cursor-pointer
          ${path=='/dashboard/how' && 'text-gray-800 font-bold'}
          `}
         >How it Works?</li>
         </Link>

         
       </ul>

        <div className='hidden md:flex'>
        <UserButton />
        </div>

        <div className='md:hidden flex flex-col gap-2'
         onClick={()=> toggle()}>
         <div className='bg-white w-8 h-1 rounded-full'></div>
         <div className='bg-white w-8 h-1 rounded-full'></div>
         <div className='bg-white w-8 h-1 rounded-full'></div>
        </div>
        


        {
          isOpen &&
          <div className='md:hidden h-screen w-[80%]  absolute top-0 right-0 bg-blue-600  '>
         <div className='flex justify-end p-4'
          onClick={()=> closeMenu()}>
          <span className='text-xl cursor-pointer'>X</span>
         </div>
        <ul className='flex flex-col gap-10 text-center p-8 text-xl'>
          <Link href={`/dashboard`}>
          <li
          className={` hover:text-gray-800 transition-color cursor-pointer
           border p-2 rounded-full
          ${path=='/dashboard' && 'text-gray-800 font-bold'}
          `}
         >Dashboard</li>
          </Link>
        
          <Link href={`/dashboard/contact`}>
         <li
         className={`hover:text-blue-800 hover:font-bold transition-color cursor-pointer
          border p-2 rounded-full
          ${path=='/dashboard/contact' && 'text-gray-800 font-bold'}
          `}
         >Contact Us</li>
         </Link>

         <Link href={`/dashboard/questions`}>
         <li
         className={`hover:text-blue-800 hover:font-bold transition-color cursor-pointer
          border p-2 rounded-full
          ${path=='/dashboard/questions' && 'text-gray-800 font-bold'}
          `}
         >Questions/Answer</li>
         </Link>

         <Link href={`/dashboard/how`}>
         <li
        className={`hover:text-blue-800 hover:font-bold transition-color cursor-pointer
         border p-2 rounded-full
          ${path=='/dashboard/how' && 'text-gray-800 font-bold'}
          `}
         >How it Works?</li>
         </Link>

         
       </ul>
        </div> 
        }
        
    </div>
  )
}

export default Header