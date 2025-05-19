"use server";

import { cookies } from "next/headers";

export const getCurrentUser = async () => {
  const refreshToken = (await cookies()).get("refreshToken")?.value;
  return refreshToken;
};
