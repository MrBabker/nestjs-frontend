"use client"; // لازم لو بتستخدم Hooks
import { useRouter } from "next/navigation";
import { useState } from "react";

interface theId {
  id: number;
}

export default function UploadImage({ id }: theId) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL = "http://localhost:5000"; // غيّره حسب Server URL

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("meal-img", selectedFile); // اسم الحقل يطابق FileInterceptor

    try {
      const res = await fetch(`${API_URL}/api/meals/img${id}`, {
        // استبدل 1 بالـ id المناسب
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        //  throw new Error("Failed to upload image");
        const errorText = await res.text(); // حفظ النص هنا
        throw new Error(
          `Failed to upload image: ${res.status} - ${
            errorText || "Unknown error"
          }`
        );
      }

      const data = await res.json();
      console.log("Upload success:", data);
      alert("Image uploaded successfully!");
      router.refresh();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert(`Error uploading image: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          accept="image/*" // يحدد صور فقط
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
    </div>
  );
}
