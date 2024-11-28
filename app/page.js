import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (

    <div
       style={{ backgroundImage: "url('https://img.freepik.com/free-photo/macro-eye-iris_23-2151618523.jpg?t=st=1732294493~exp=1732298093~hmac=1ec9c015cdad6a114bcb00b3d38dead5e6ad5c39cd37db81ebb1945b4d0066d0&w=1380')"}}
      className="flex items-center justify-center h-screen w-full bg-cover bg-center">
      <div className="space-y-3 text-center text-white font-sans md:mt-64"
      >
        <h1 className="text-6xl font-extrabold"> AI-Powered Mock Interviews</h1>
        <h2 className="text-xl font-bold">Prepare, Practice, and Succeed with Our Intelligent Interview Coaching</h2>
        <Link href={`/dashboard`}>
          <Button className='bg-transparent hover:bg-gray-900 mt-4 border'>Get Started Now</Button>
        </Link>
      </div>
    </div>
  );
}
