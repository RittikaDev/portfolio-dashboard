"use client";

import { useGetMeQuery } from "@/redux/features/authApi";
import React from "react";
type DashboardProps = {
  token: string;
};

const Dashboard = ({ token }: DashboardProps) => {
  const { data: user } = useGetMeQuery(token);
  console.log(user);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10">
      {user && (
        <>
          <h1 className="text-4xl font-semibold text-center text-gray-800 dark:text-gray-500 mb-4">
            Welcome !!
          </h1>
          <h2 className="text-2xl text-center text-gray-600 mb-6">
            Logged-in user email:
            <span className="font-semibold"> {user?.data.email}</span>
          </h2>

          <div className="bg-slate-200 dark:bg-slate-800  p-6 rounded-lg shadow-lg max-w-md w-full">
            <p className="text-center text-gray-500 dark:text-gray-200 text-sm">
              This is your dashboard, where you can manage your settings and
              preferences.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
