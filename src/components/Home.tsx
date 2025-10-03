"use client";
import React, { useEffect, useState } from "react";
import Navebar from "@/components/Navebar";
import { API_URL, Meal } from "@/constants";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [minp, setMinp] = useState(""); // State للحد الأدنى
  const [maxp, setMaxp] = useState(""); // State للحد الأقصى
  const [name, setName] = useState(""); // State للحد الأقصى

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

  const fetchMeals = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      const queryParams = new URLSearchParams({
        name: name || "", // إذا مفيش قيمة، يبقى فارغ
        minp: minp || "",
        maxp: maxp || "",
      }).toString();

      const res = await fetch(`${API_URL}/api/meals?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // أضف توثيق لو مطلوب (زي Authorization)
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch meals");
      }

      const data = await res.json();
      setMeals(data);
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      //setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b  overflow-hidden">
      <Navebar />
      <div className="w-full p-5">
        <form
          onSubmit={fetchMeals}
          className="flex items-center max-w-xl mx-auto"
        >
          <input
            className="w-full bg-white py-2 px-4 rounded-l-md border border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all duration-200 placeholder-gray-600"
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Search your meal..."
          />
          <input
            type="number"
            placeholder="Min Price"
            onChange={(e) => setMinp(e.target.value)}
            className="p-2 border rounded w-20"
          />
          <input
            type="number"
            placeholder="Max Price"
            onChange={(e) => setMaxp(e.target.value)}
            className="p-2 border rounded w-20"
          />
          <button className="w-24 bg-[#FFD700] text-[#8B4513] py-2 px-4 rounded-r-md hover:bg-[#FFC107] transition duration-200 font-semibold">
            Search
          </button>
        </form>
      </div>
      <div className="overflow-y-auto flex-1 p-5">
        {meals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {meals.map((meal) => (
              <div key={meal.id} className="m-2">
                <div className="p-5 h-72 bg-[#5C4033] rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
                  <h1 className="text-[#FFD700] font-bold text-xl mb-2">
                    {meal.name}
                  </h1>
                  <div className="text-white text-lg">${meal.price}</div>
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
    </div>
  );
};

export default Home;
