/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues) => {
  console.log("new auth method", userData);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    console.log("login response", res);
    const result = await res.json();
    console.log("result", result);

    if (result.success) {
      console.log("Login successful");
      (await cookies()).set("accessToken", result?.data?.token);
      // (await cookies()).set("refreshToken", result?.data?.refreshToken);
    } else throw new Error(result.message || "Login failed");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else return null;
};

export const getToken = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  console.log("accessToken", accessToken);
  return accessToken;
};

export const clearAccessToken = async () => {
  (await cookies()).delete("accessToken");
};

// CREATING NEW ACCESS TOKEN BY USING REFRESH TOKEN
export const getNewToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("refreshToken")!.value,
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
