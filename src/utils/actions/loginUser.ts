// "use server";

// import { FormValues } from "@/app/login/page";

// import envConfig from "@/config/env.config";

// export const loginUser = async (data: FormValues) => {
//   // const res = await fetch(`${process.env.BACKEND_URL}/login`, {
//   const res = await fetch(`${envConfig.baseApi}/api/auth/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//     cache: "no-store",
//   });
//   const userInfo = await res.json();
//   return userInfo;
// };
