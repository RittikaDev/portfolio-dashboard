"use client";

import { logout } from "@/redux/features/auth/authSlice";
import { useLogoutUserMutation } from "@/redux/features/authApi";
import {
  Brain,
  FileStack,
  Laptop,
  LayoutDashboard,
  MessageCircle,
  Pen,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import ShinyButton from "../ui/shiny-button";
import Image from "next/image";
import logoRD from "@/../public/Logo-RD.png";
import { clearAccessToken } from "@/services/AuthService";

const Sidebar = () => {
  const pathName = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser(null).unwrap();
      dispatch(logout());
      clearAccessToken();

      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      {isClient ? (
        <div className="min-h-screen p-4 rounded-xl relative">
          {/* Hamburger icon to toggle sidebar on mobile */}
          <button
            className="md:hidden p-2 mb-4 text-gray-700 dark:text-gray-200"
            onClick={toggleSidebar}
          >
            <div className="w-6 h-1 bg-gray-700 mb-1"></div>
            <div className="w-6 h-1 bg-gray-700 mb-1"></div>
            <div className="w-6 h-1 bg-gray-700"></div>
          </button>
          {/* Sidebar overlay for small screens */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 md:hidden transition-opacity ${
              isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsSidebarOpen(false)} // Close sidebar when clicking outside
          ></div>
          {/* Sidebar content */}

          <div
            ref={sidebarRef}
            className={`fixed top-0 left-0 bottom-0 w-64 bg-emerald-50 shadow-md p-4 flex flex-col ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform transform md:relative md:translate-x-0 md:w-auto md:block md:bg-transparent md:shadow-none`}
          >
            <div className="mb-6 flex justify-center">
              <Image src={logoRD} className="w-14 cursor-pointer" alt="logo" />
            </div>

            <ul className="flex flex-col gap-2 flex-grow overflow-auto">
              <li>
                <Link
                  href="/dashboard"
                  className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 ${
                    pathName === "/dashboard"
                      ? "bg-emerald-700 text-white shadow-md"
                      : "text-gray-700 hover:bg-emerald-500 hover:text-white"
                  }`}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/experience"
                  className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 ${
                    pathName === "/dashboard/experience"
                      ? "bg-emerald-700 text-white shadow-md"
                      : "text-gray-700 hover:bg-emerald-500 hover:text-white"
                  }`}
                >
                  <Laptop className="h-5 w-5" />
                  <span>Experience</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/skills"
                  className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 ${
                    pathName === "/dashboard/skills"
                      ? "bg-emerald-700 text-white shadow-md"
                      : "text-gray-700 hover:bg-emerald-500 hover:text-white"
                  }`}
                >
                  <Brain className="h-5 w-5" />
                  <span>Skills</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/projects"
                  className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 ${
                    pathName === "/dashboard/projects"
                      ? "bg-emerald-700 text-white shadow-md"
                      : "text-gray-700 hover:bg-emerald-500 hover:text-white"
                  }`}
                >
                  <FileStack className="h-5 w-5" />
                  <span>Projects</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/blogs"
                  className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 ${
                    pathName === "/dashboard/blogs"
                      ? "bg-emerald-700 text-white shadow-md"
                      : "text-gray-700 hover:bg-emerald-500 hover:text-white"
                  }`}
                >
                  <Pen className="h-5 w-5" />
                  <span>Blogs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/messages"
                  className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 ${
                    pathName === "/dashboard/messages"
                      ? "bg-emerald-700 text-white shadow-md"
                      : "text-gray-700 hover:bg-emerald-500 hover:text-white"
                  }`}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-medium">Messages</span>
                </Link>
              </li>
            </ul>
            <div className="mt-auto">
              <div onClick={handleLogout} className="p-2 cursor-pointer">
                <ShinyButton className="w-full">Log Out</ShinyButton>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Sidebar;
