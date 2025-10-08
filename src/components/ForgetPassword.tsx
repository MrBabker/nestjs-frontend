'use client'
import { API_URL } from '@/constants';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const ForgetPassword = () => {


    const router= useRouter();
    const [email,setEmail] = useState('');
    const [usernmae,setPassword] = useState('');
    const [sentmessage,setSetmessage] = useState(false);
     const [notset,setNotset] = useState(false);

     const [loading , setloading] = useState(false)

     const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
      };
       const handleUsernmaeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        };

    const SendInformations = async(e) =>{
         e.preventDefault();
        
         if(!loading){
             setloading(true);
            setSetmessage(false);
                setNotset(false);
         }
        

            try {
              const res = await fetch(`${API_URL}/users/resetpass`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: email,
                  usernmae: usernmae,
                }),
                credentials: "include",
              });
        
              if (res.ok) {
               // router.push("/");
               setSetmessage(true);
                setNotset(false);
                setloading(false);
              } else {
                setNotset(true)
                 setSetmessage(false);
                  setloading(false);
                console.log(res.json());
              }
            } catch (error) {}
    }

  return (
    <div className=' w-screen '> 
     <div><Link href='/pages/login'>Back</Link></div>
    <div  className=' w-full justify-items-center '>
       
        <div className='p-5 text-xl mt-18'> 
            Write the email and username of your account to send a reset password link to the email
        </div>
         <div className='px-5 text-gray-600 mb-20 text-justify'> 
            
            if you sure is your account with the following email you can find the username in the first 
            message we sent to you when you created your account 
        </div>
        <form onSubmit={SendInformations} className='' >
 <span> Email:</span>
            <br className=" pointer-none:" />
            <input
             
              type="email"
              onChange={handleEmailChange}
              className=" rounded-md border-2 border-gray-200 w-full px-2 py-1"
            />
             <span> Username:</span>
            <br className=" pointer-none:" />
            <input
             
              type="text"
               onChange={handleUsernmaeChange}
              className=" rounded-md border-2 border-gray-200 w-full px-2 py-1"
            />
             <button className=" shadow-2xl  hover:bg-blue-800 font-bold mt-5 p-3 bg-blue-600 w-full text-white rounded-md">
              Send  🚀
            </button>
        </form>
        <div className=' h-10'></div>
        {sentmessage &&
            <div className=' border border-green-700 p-7 bg-green-100 rounded-2xl text-green-600'>Reset password link sent to your email succsusfully</div>}
              {notset &&
            <div className=' border border-red-700 p-7 bg-red-100 rounded-2xl text-red-500'>invalid information</div>}
              {loading &&
            <div className=' font-bold p-7  '>Loading 📧 ...</div>}
    </div></div>
   
  )
}

export default ForgetPassword