'use client'
import { API_URL } from '@/constants';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

const Page = () => {

     const params = useParams();
  const { id, token } = params; 
   const [password,setPassword] = useState('')
      const [password2,setPassword2] = useState('');
      const [ok,setok] = useState(false);
      const [notok,setnotok] = useState(false);
       const [notmatch,setnotmatch] = useState(false);

   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
              if(notmatch)
          setnotmatch(false);
        };
         const handlePassword2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword2(e.target.value);
             
            if(notmatch)
                setnotmatch(false);
              
          };



           const SendInformations = async(e) =>{
                   e.preventDefault();

                   if(password !== password2){  setnotmatch(true); return;}
                  
                      try {
                        const res = await fetch(`${API_URL}/users/resetedpass`, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            password: password,
                            id:id,
                            token:token
                          }),
                          credentials: "include",
                        });
                  
                        if (res.ok) {
                         // router.push("/");
                         setok(true);
                          setnotok(false);
                        } else {
                          setnotok(true)
                           setok(false);
                          console.log(res.json());
                        }
                      } catch (error) {}
              }
  return (
    <div  className=' w-screen justify-items-center '>
        <div className='p-5 text-xl mt-20'> 
            Write the the new password
        </div>
        
        <form onSubmit={SendInformations} className='' >
 <span> New password:</span>
            <br className=" pointer-none:" />
            <input
             
              type="password"
              onChange={handlePasswordChange}
              className=" rounded-md border-2 border-gray-200 w-full px-2 py-1"
            />
               
             {notmatch && <span className=' text-red-700'> Confiarm password not match:</span>}
             <br className=" pointer-none:" />
             <span> Confiarm new password:</span>
           
            <input
             
              type="password"
               onChange={handlePassword2Change}
              className=" rounded-md border-2 border-gray-200 w-full px-2 py-1"
            />
             <button className=" shadow-2xl  hover:bg-blue-800 font-bold mt-5 p-3 bg-blue-600 w-full text-white rounded-md">
              Reset
            </button>
        </form>
        <div className=' h-10'></div>
        {ok &&
        <div className=' w-screen justify-items-center'>
              <div className=' border border-green-700 p-7 bg-green-100 rounded-2xl text-green-600'>Password reseted succsusfully</div>
              <div className=' mt-5'><Link className=' text-blue-700 ' href='/pages/login'>Go to login ➡️</Link></div>
              
        </div>
          }
              {notok &&
            <div className=' border border-red-700 p-7 bg-red-100 rounded-2xl text-red-500'>Something went wrong or invalid password </div>}
    </div>
  )
}

export default Page