"use client";
import { API_URL, User } from "@/constants";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navebar = () => {
  const [islogin, setIslogin] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    GetCurrentUser();
  }, []);

  const GetCurrentUser = async () => {
    try {
      const res = await fetch(`${API_URL}/users/cur`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",
      });

      if (res.ok) {
        console.log(res);

        const data = await res.json();
        setUser(data);
        setIslogin(true);
      } else {
        console.log(res.json());
      }
    } catch (error) {}
  };
  return (
    <div className="h-18 bg-red-800 flex justify-end items-center p-2 shadow-2xl">
      {islogin == false && (
        <Link
          className=" p-3 bg-white font-bold text-red-800 rounded-xl"
          href="pages/login"
        >
          Login
        </Link>
      )}
      {islogin && "Welcom " + user?.usernmae}
    </div>
  );
};

export default Navebar;
