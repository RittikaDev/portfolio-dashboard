"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";

export default function ProtectedRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	const token = useSelector(selectCurrentToken);
	const router = useRouter();

	useEffect(() => {
		if (!token) {
			router.replace("/login"); // redirect to login if not authenticated
		}
	}, [token, router]);

	if (!token) return null; // prevent flashing content

	return <>{children}</>;
}
