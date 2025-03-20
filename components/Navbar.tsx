"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, BookOpen, Briefcase, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import logo from "@/assets/imgs/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();
  const isDashboard = pathname.startsWith("/dashboard");

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

  // Define navigation links based on route
  type NavLink = {
    href: string;
    label: string;
    icon?: React.ElementType;
  };

  const homeNavLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const dashboardNavLinks: NavLink[] = [
    { href: "/dashboard", label: "Dashboard", icon: User },
    { href: "/", label: "Home", icon: BookOpen },
    { href: "/docs", label: "Documentation", icon: Briefcase },
  ];

  const navLinks = isDashboard ? dashboardNavLinks : homeNavLinks;

  return (
    <>
      {/* Spacer div to prevent content from jumping when navbar becomes fixed */}

      <nav
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md"
            : "bg-white dark:bg-gray-900 shadow"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center p-4 lexend-400">
          <Link
            href="/"
            className="text-xl font-bold flex items-center space-x-2"
          >
            <Image
              src={logo || "/placeholder.svg"}
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
                  className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg
                  transition-all duration-200 ease-in-out
                  ${
                    pathname === link.href
                      ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-gray-800"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800"
                  }
                  `}
                >
                  {link.icon && (
                    <link.icon
                      size={18}
                      className={`${
                        pathname === link.href
                          ? "text-blue-600 dark:text-blue-400"
                          : ""
                      }`}
                    />
                  )}
                  <span className="font-medium">{link.label}</span>
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

              {isSignedIn ? (
                <div className="flex items-center space-x-4">
                  {" "}
                  {!isDashboard && (
                    <Link
                      href="/dashboard"
                      className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      Dashboard
                    </Link>
                  )}
                  <div className="flex items-center space-x-4">
                    <SignOutButton>
                      <button className="px-4 py-2 rounded-lg text-red-600 border border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-gray-800 transition-colors">
                        Sign Out
                      </button>
                    </SignOutButton>
                    <div className="relative h-8 w-8 overflow-hidden rounded-full">
                      <UserButton />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/sign-in"
                    className="px-4 py-2 rounded-lg text-blue-600 border border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-800 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              )}
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

            {isSignedIn && (
              <div className="relative h-8 w-8 overflow-hidden rounded-full mr-2">
                <UserButton />
              </div>
            )}

            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X size={24} className="dark:text-white" />
              ) : (
                <Menu size={24} className="dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Absolute instead of pushing content down */}
        {isOpen && (
          <div className="md:hidden absolute w-full bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-lg">
            <div className="flex flex-col items-center p-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon && <link.icon size={18} />}
                  {link.label}
                </Link>
              ))}

              {isSignedIn ? (
                <>
                  {!isDashboard && (
                    <Link
                      href="/dashboard"
                      className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors w-full text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Go to Dashboard
                    </Link>
                  )}
                  <SignOutButton>
                    <span className="px-4 py-2 rounded-lg text-red-600 border border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-400 dark:hover:bg-gray-800 transition-colors w-full block text-center cursor-pointer">
                      Sign Out
                    </span>
                  </SignOutButton>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="px-4 py-2 rounded-lg text-blue-600 border border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-800 transition-colors w-full text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors w-full text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      <div className="h-2 dark:bg-slate-900" />
    </>
  );
};

export default Navbar;
