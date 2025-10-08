"use client";
import { API_URL } from "@/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const LoginSubmet = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/users/log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        credentials: "include",
      });

      if (res.ok) {
        router.push("/");
      } else {
        console.log(res.json());
      }
    } catch (error) {}
  };

  return (
    <div className=" w-screen  h-screen justify-items-center justify-center bg-gradient-to-b from-blue-100 to-blue-500 ">
      <div className=" w-[50%] h-full justify-items-center pt-20">
        <div className=" w-[70%]  bg-white rounded-2xl shadow-xl  p-5">
          <form onSubmit={LoginSubmet}>
            <div className=" w-full justify-items-center">
              <h2 className=" text-blue-700 font-extrabold text-2xl ">
                Log in
              </h2>
            </div>

            <span> Email:</span>
            <br className=" pointer-none:" />
            <input
              onChange={handleEmailChange}
              type="email"
              className=" rounded-md border-2 border-gray-200 w-full px-2 py-1"
            />

            <br className=" pointer-none:" />
            <br className=" pointer-none:" />
            <span> Password:</span>
            <br className=" pointer-none:" />
            <input
              onChange={handlePasswordChange}
              type="password"
              className=" rounded-md border-2 border-gray-200 w-full px-2 py-1"
            />

            <button className=" shadow-2xl  hover:bg-blue-800 font-bold mt-5 p-3 bg-blue-600 w-full text-white rounded-md">
              Login
            </button>
            <Link href='/pages/forgetPass' className="mt-2 text-red-700 underline"> forget password</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
