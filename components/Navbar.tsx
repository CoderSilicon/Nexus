"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/imgs/logo.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md w-full sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4 lexend-400">
        <div className="text-xl font-bold justify-center items-center flex space-x-2">
          <Image src={logo} width={40} height={40} alt="Logo" />
          Nexus
        </div>
        <div className="hidden md:flex space-x-6 plus-jakarta-sans-400">
          <a href="#" className="hover:text-blue-600">
            Home
          </a>
          <a href="#" className="hover:text-blue-600">
            Pricing
          </a>
          <a href="#" className="hover:text-blue-600">
            About
          </a>
        </div>
        <div className="hidden md:flex">
          <button className="px-4 py-2 border rounded-lg text-white bg-blue-600 hover:bg-blue-700">
            Get Started
          </button>
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col items-center p-4 space-y-4 bg-white shadow-md">
          <a href="#" className="hover:text-blue-600">
            Home
          </a>
          <a href="#" className="hover:text-blue-600">
            About
          </a>
          <a href="#" className="hover:text-blue-600">
            Services
          </a>
          <a href="#" className="hover:text-blue-600">
            Contact
          </a>
          <button className="px-4 py-2 border rounded-lg text-white bg-blue-600 hover:bg-blue-700">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
