"use client";

import { File, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { FaHome, FaTasks } from "react-icons/fa";

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
            className={`fixed top-0 left-0 bottom-0 w-64 bg-white shadow-md p-4 space-y-4 transition-transform transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:relative md:translate-x-0 md:w-auto md:block md:bg-transparent md:shadow-none`}
          >
            <ul>
              <li>
                <Link
                  href="/"
                  className={`flex items-center space-x-2 p-3 rounded-md hover:bg-slate-400 text-gray-700 dark:text-gray-200 ${
                    pathName === "/" ? "bg-zinc-400 text-white" : ""
                  }`}
                >
                  <FaHome className="h-5 w-5" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className={`flex items-center space-x-2 p-3 rounded-md hover:bg-slate-400 text-gray-700 dark:text-gray-200 ${
                    pathName === "/dashboard" ? "bg-zinc-400 text-white" : ""
                  }`}
                >
                  <FaHome className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/projects"
                  className={`flex items-center space-x-2 p-3 rounded-md hover:bg-slate-400 text-gray-700 dark:text-gray-200 ${
                    pathName === "/dashboard/projects"
                      ? "bg-zinc-400 text-white"
                      : ""
                  }`}
                >
                  <FaTasks className="h-5 w-5" />
                  <span>Projects</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/blogs"
                  className={`flex items-center space-x-2 p-3 rounded-md hover:bg-slate-400 text-gray-700 dark:text-gray-200 ${
                    pathName === "/dashboard/blogs"
                      ? "bg-zinc-400 text-white"
                      : ""
                  }`}
                >
                  <File className="h-5 w-5" />
                  <span>Blogs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/messages"
                  className={`flex items-center space-x-2 p-3 rounded-md hover:bg-slate-400 text-gray-700 dark:text-gray-200 ${
                    pathName === "/dashboard/messages"
                      ? "bg-zinc-400 text-white"
                      : ""
                  }`}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Messages</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Sidebar;
