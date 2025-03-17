"use client";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/imgs/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle dark mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
          : "bg-white dark:bg-gray-900"
      } shadow-md`}
    >
      <div className="container mx-auto flex justify-between items-center p-4 lexend-400">
        <Link
          href="/"
          className="text-xl font-bold flex items-center space-x-2"
        >
          <Image
            src={logo}
            width={40}
            height={40}
            alt="Logo"
            className="dark:invert"
          />
          <span className="dark:text-white">Nexus</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 plus-jakarta-sans-400">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? <Sun className="text-yellow-500" /> : <Moon />}
            </button>
            <button className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isDark ? <Sun className="text-yellow-500" /> : <Moon />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X size={24} className="dark:text-white" />
            ) : (
              <Menu size={24} className="dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center p-4 space-y-4 bg-white dark:bg-gray-900 border-t dark:border-gray-800">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors w-full">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
