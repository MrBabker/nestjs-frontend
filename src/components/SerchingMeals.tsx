"use client";
import { API_URL } from "@/constants";
import React, { useState } from "react";

const SerchingMeals = ({ setMeals }) => {
  const [minp, setMinp] = useState(""); // State للحد الأدنى
  const [maxp, setMaxp] = useState(""); // State للحد الأقصى
  const [name, setName] = useState(""); // State للحد الأقصى

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
    <div>
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
          className="p-2 border  w-20 bg-white"
        />
        <input
          type="number"
          placeholder="Max Price"
          onChange={(e) => setMaxp(e.target.value)}
          className="p-2 border  w-20 bg-white"
        />
        <button className="w-24 bg-[#FFD700] text-[#8B4513] py-2 px-4 rounded-r-md hover:bg-[#FFC107] transition duration-200 font-semibold">
          Search
        </button>
      </form>
    </div>
  );
};

export default SerchingMeals;
