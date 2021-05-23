import React, { useState, useEffect } from "react";
import Dropdown from "./dropdown/dropdown";

const _toggleBurger = (burgerOpen, setBurgerOpen) => () => {
  setBurgerOpen(!burgerOpen);
};

const _hideMenu = (burgerOpen, setBurgerOpen) => () => {
  if (window.innerWidth > 768 && burgerOpen) {
    setBurgerOpen(false);
  }
};

const Navbar = () => {
  const [burgerOpen, setBurgerOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", _hideMenu(burgerOpen, setBurgerOpen));

    return () => {
      window.removeEventListener(
        "resize",
        _hideMenu(burgerOpen, setBurgerOpen)
      );
    };
  }, [burgerOpen]);

  return (
    <div>
      <div className="flex justify-between items-center h-16 bg-yellow-500 text-black realtive shadow-lg font-mono">
        <h1 className="pl-8 text-green-600 font-black">Kulkasku</h1>
        <div
          className="px-4 cursor-pointer md:hidden"
          onClick={_toggleBurger(burgerOpen, setBurgerOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
        <div className="pr-8 md:block hidden">
          <text className="p-4">Order</text>
          <text className="p-4">Contact</text>
        </div>
      </div>
      <Dropdown
        isOpen={burgerOpen}
        toggle={_toggleBurger(burgerOpen, setBurgerOpen)}
      />
    </div>
  );
};

export default Navbar;
