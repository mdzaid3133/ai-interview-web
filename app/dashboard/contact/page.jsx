'use client';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';

function Page() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(e)

    emailjs
      .sendForm('service_jey85xv', 'template_cikjrfn', form.current, 'kashfYlPRWRzbrpXM')
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
 
  return (
    
    <div className='flex items-center justify-center w-full h-screen px-5 '>
      <div className='md:w-[400px] w-full border rounded-lg p-4 bg-slate-200'>
        <h1 className='text-blue-600 text-center mb-10 text-xl font-bold'>Contact Us</h1>
        <form ref={form} onSubmit={sendEmail}>
          <label htmlFor='username' className='font-semibold text-gray-900'>User name</label>
          <Input type="text" id="username" placeholder="User name" name="user_name" className="mb-4" />
          <label htmlFor='email' className='font-semibold text-gray-900'>Email</label>
          <Input type="email" id="email" placeholder="Email" name="user_email" className="mb-4" />
          <label htmlFor='message' className='font-semibold text-gray-900'>Message</label>
          <Textarea placeholder="Type your message here." id="message" name="message" className="mb-4" />
          <Button type="submit" value="Send" className="bg-blue-600 hover:bg-blue-500">Send</Button>
        </form>
      </div>
    </div>
  );
}

export default Page;
