"use client";
import { Meal } from "@/constants";
import React from "react";
import UploadImage from "./UploadImage";
import Image from "next/image";

const AboutMeal = ({ id, name, type, image, price }: Meal) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-white shadow-2xl rounded-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* الصورة */}
        <div className="w-full md:w-1/3 h-64 relative overflow-hidden rounded-xl">
          <Image
            src={
              image
                ? `http://localhost:5000/api/meals/${image}`
                : "/placeholder.jpg"
            }
            alt={name}
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* المعلومات */}
        <div className="w-full md:w-2/3 space-y-4">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {name}
          </h2>
          <div className="flex items-center justify-between text-gray-700">
            <span className="text-lg">Type: {type}</span>
            <span className="text-xl font-medium text-teal-600">${price}</span>
          </div>
          <p className="text-gray-600 text-sm">
            Enjoy this delicious meal with a modern twist. Perfect for any
            occasion!
          </p>
          <UploadImage id={id} />
          <button className="w-full md:w-auto px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors duration-200 shadow-md hover:shadow-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutMeal;
