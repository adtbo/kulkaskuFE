import React from "react";

const Dropdown = ({ isOpen }) => {
  return (
    <div
      className={
        isOpen
          ? "w-screen grid grid-rows-2 text-center itemws-center bg-yellow-200 shadow-lg font-mono absolute"
          : "hidden"
      }
    >
      <text className="p-4">Order</text>
      <text className="p-4">Contact</text>
    </div>
  );
};

export default Dropdown;
