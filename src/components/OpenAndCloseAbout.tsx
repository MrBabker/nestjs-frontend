import React from "react";

interface openClose {
  setOpenAbout: React.Dispatch<React.SetStateAction<boolean>>;
}

const OpenAndCloseAbout = ({ setOpenAbout }: openClose) => {
  return (
    <div>
      {" "}
      <button
        onClick={() => setOpenAbout(false)}
        className=" mt-4 ml-2 rounded-md border hover:bg-red-800 w-20 h-8 bg-red-700 text-white font-bold  "
      >
        Back
      </button>
    </div>
  );
};

export default OpenAndCloseAbout;
