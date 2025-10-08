"use client";
import React, { useContext, useEffect, useState } from "react";
import Navebar from "@/components/Navebar";
import { API_URL, Meal } from "@/constants";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SerchingMeals from "./SerchingMeals";
import UploadImage from "./UploadImage";
import AboutMeal from "./AboutMeal";
import OpenAndCloseAbout from "./OpenAndCloseAbout";
import AuthContext from "./Context";

const Home = () => {
  const { usertype, setUsertype } = useContext(AuthContext);

  const router = useRouter();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [openAbout, setOpenAbout] = useState(false);
  const [themeal, setThemeal] = useState<Meal>({
    id: 0,
    image: "",
    name: "",
    price: 0,
    type: "",
  });

  useEffect(() => {
    GetAllMeals();
  }, []);

  const GetAllMeals = async () => {
    try {
      const res = await fetch(`${API_URL}/api/meals`);

      if (res.ok) {
        console.log(res);

        const data = await res.json();
        setMeals(data);
      } else {
        console.log(res.json());
      }
    } catch (error) {}
  };

  const SelectAbout = ({ id, name, type, image, price }: Meal) => {
    const ameal = {
      id: id,
      name: name,
      type: type,
      image: image,
      price: price,
    };
    setOpenAbout(true);
    setThemeal(ameal);
  };
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b bg-amber-950  overflow-hidden">
      <Navebar />
      <div className="w-full p-5 shadow-2xl z-10">
        <SerchingMeals setMeals={setMeals} />
      </div>
      {!openAbout && (
        <div className="overflow-y-auto flex-1 p-5">
          {meals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {meals.map((meal) => (
                <div key={meal.id} className="m-2">
                  <div className="p-5 h-72 bg-[#5C4033] rounded-2xl shadow-md  border  border-white transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
                    {/* { <div className="  w-50 h-10 top-0 ">
                    {" "}
                    <UploadImage id={meal.id} />
                  </div>} */}

                    <h1 className="text-[#FFD700] font-bold text-xl mb-2">
                      {meal.name}
                    </h1>
                    <div className="text-white text-lg">${meal.price}</div>
                    <Image
                      className=" rounded-md"
                      src={
                        "http://localhost:5000/api/meals/" +
                        (meal.image ? meal.image : "")
                      }
                      alt="meal"
                      width={120}
                      height={100}
                    />

                    <div className=" flex flex-row">
                      <div className=" w-full h-fit border mt-4 p-5 rounded-md bg-white/20"></div>
                      <div>
                        {usertype === "admin" && (
                          <button
                            onClick={() => SelectAbout(meal)}
                            className="  ml-2 rounded-md border hover:bg-red-800 w-20 h-8 bg-red-700 text-white font-bold  "
                          >
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => SelectAbout(meal)}
                          className="mt-4  ml-2 rounded-md border hover:bg-teal-700 w-20 h-8 bg-teal-600 text-white font-bold  "
                        >
                          Add
                        </button>
                      </div>

                      <br />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-[#FFD700] font-extrabold text-3xl animate-pulse">
              Loading...
            </div>
          )}
        </div>
      )}

      {openAbout && (
        <div>
          <AboutMeal
            id={themeal.id}
            name={themeal.name}
            price={themeal.price}
            type={themeal.type}
            image={themeal.image}
          />
          <OpenAndCloseAbout setOpenAbout={setOpenAbout} />
        </div>
      )}
    </div>
  );
};

export default Home;
