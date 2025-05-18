"use client";

import Image from "next/image";

import logoRD from "@/../public/Logo-RD.png";
import header from "@/../public/header-bg-color.png";
import MenuBlack from "@/../public/menu-black.png";
import MenuWhite from "@/../public/menu-white.png";
import CloseBlack from "@/../public/close-black.png";
import CloseWhite from "@/../public/close-white.png";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/theme-context";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

type UserProps = {
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
};

const Navbar = ({ session }: { session: UserProps | null }) => {
  const [isScroll, setIsScroll] = useState(false);
  const pathName = usePathname();
  const sideMenuRef = useRef<HTMLUListElement>(null);
  const { theme } = useTheme();

  const openMenu = () => {
    if (sideMenuRef.current)
      sideMenuRef.current.style.transform = "translate(-16rem";
  };
  const closeMenu = () => {
    if (sideMenuRef.current)
      sideMenuRef.current.style.transform = "translate(16rem";
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (scrollY > 50) setIsScroll(true);
      else setIsScroll(false);
    });
  }, []);
  console.log("here");
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <div className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%]">
        <Image src={header} alt="header" className="w-full" priority />
      </div>
      <nav
        className={`w-full fixed px-5 lg:px-8 xl:px-[8%] pb-4 flex items-center justify-between z-50 dark:bg-gray-900 dark:text-white ${
          isScroll ? "bg-white bg-opacity-50 backdrop-blur-lg shadow-sm" : ""
        }`}
      >
        <a href="#top">
          <Image
            src={logoRD}
            className="w-16 cursor-pointer mr-14"
            alt="logo"
          />
        </a>
        <ul
          className={`hidden md:flex items-center gap-6 lg-gap-8 rounded-full px-12 py-3 ${
            !isScroll
              ? "bg-white dark:bg-slate-800 shadow-sm bg-opacity-50"
              : ""
          }`}
        >
          <li>
            <Link
              href="/"
              className={` ${
                pathName === "/" ? "font-bold text-teal-600" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className={` ${
                pathName === "/projects" ? "font-bold text-teal-600" : ""
              }`}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className={` ${
                pathName === "/blog" ? "font-bold text-teal-600" : ""
              }`}
            >
              Blogs
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={` ${
                pathName === "/contact" ? "font-bold text-teal-600" : ""
              }`}
            >
              Contact
            </Link>
          </li>
          {session?.user && (
            <li>
              <Link
                href="/dashboard"
                className={` ${
                  pathName === "/dashboard" ? "font-bold text-teal-600" : ""
                }`}
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        <button className="block md:hidden ml-44" onClick={openMenu}>
          <Image
            src={theme === "light" ? MenuBlack : MenuWhite}
            alt="menu_black"
            width={35}
          />
        </button>

        <div>
          {session?.user ? (
            <Link
              href="/"
              onClick={handleLogout}
              className="hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4 font-Ovo transition-all duration-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:scale-105"
            >
              LogOut
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4 font-Ovo transition-all duration-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:scale-105"
            >
              Login
            </Link>
          )}
        </div>
        {/* MOVILE MENU */}
        <ul
          ref={sideMenuRef}
          className="flex md:hidden flex-col gap-4 l py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 dark:bg-darkHover dark:text-white"
        >
          <div className="absolute right-6 top-6" onClick={closeMenu}>
            <Image
              src={theme === "light" ? CloseBlack : CloseWhite}
              className="w-5 cursor-pointer"
              alt="close_black"
            />
          </div>
          <li>
            <Link href="#top" className="font-Ovo" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/projects" className="font-Ovo" onClick={closeMenu}>
              Projects
            </Link>
          </li>
          <li>
            <Link href="/blog" className="font-Ovo" onClick={closeMenu}>
              Blogs
            </Link>
          </li>
          <li>
            <Link href="/contact" className="font-Ovo" onClick={closeMenu}>
              Contact
            </Link>
          </li>
          {session?.user && (
            <li>
              <Link
                href="/dashboard"
                className={` ${
                  pathName === "/dashboard" ? "font-bold text-teal-600" : ""
                }`}
              >
                Dashboard
              </Link>
            </li>
          )}
          <li>
            {session?.user ? (
              <Link href="/" onClick={handleLogout} className="font-Ovo">
                LogOut
              </Link>
            ) : (
              <Link href="/login" className="font-Ovo">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
