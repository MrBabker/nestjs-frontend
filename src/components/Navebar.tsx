"use client";
import { API_URL, User } from "@/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./Context";

const Navebar = () => {
  const { usertype, setUsertype } = useContext(AuthContext);

  const router = useRouter();
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
        console.log("is login : " + islogin);
        if (data.employeetype === "admin") {
          await setUsertype("admin");
          console.log("heeeloooo  " + user?.employeetype);
        }
      } else {
        console.log(res.json());
      }
    } catch (error) {}
  };

  const LogOut = async () => {
    try {
      const res = await fetch(`${API_URL}/users/out`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",
      });

      if (res.ok) {
        console.log(res);

        //const data = await res.json();
        //setUser(data);
        await setUsertype("normal");
        setIslogin(false);
      } else {
        //console.log(res.json());
      }
    } catch (error) {}
  };
  return (
    <div className="h-18 bg-black flex w-screen  items-center p-2 shadow-2xl">
      <div className=" w-100 p-3">
        <Link className=" text-orange-200" href="pages/orders">
          My Orders <span className=" text-2xl">🛒</span>
        </Link>
      </div>
      <div className=" w-full justify-end">
        {islogin == false && (
          <Link
            className=" p-3 bg-white font-bold text-red-800 rounded-xl"
            href="pages/login"
          >
            Login
          </Link>
        )}
        {islogin && (
          <div className="py-3 flex items-center justify-between">
            <div className=" mr-3 text-white font-bold">
              Welcome{" "}
              <span className="font-semibold">{user?.usernmae || "Guest"}</span>
            </div>
            <button
              onClick={LogOut}
              className="py-2 px-3  bg-white text-red-900 rounded hover:bg-red-100 transition font-bold  cursor-grab:"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navebar;
