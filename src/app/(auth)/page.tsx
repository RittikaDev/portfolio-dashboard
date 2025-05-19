/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { verifyToken } from "@/utils/verifyToken";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { loginUser } from "@/services/AuthService";
// import Cookies from "js-cookie";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // const res = await login({ email, password }).unwrap();
      const res = await loginUser({ email, password });
      // console.log("Login Success:", res);
      if (res.success) {
        const user = verifyToken(res?.data?.token);
        console.log(res.data.token);
        // Cookies.set("refreshToken", res.data.token, {
        // 	path: "/",
        // 	expires: 1,
        // 	sameSite: "Lax",
        // 	secure: true,
        // });
        dispatch(
          setUser({
            user: user,
            access_token: res?.data?.token,
          })
        );
        toast.success(res?.message);
        setTimeout(() => {
          router.push("/dashboard");
        }, 100);
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
      toast.error(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-rose-100 to-yellow-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-6">
          Login <span className="text-teal-500">Here</span>
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{"Login failed."}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
