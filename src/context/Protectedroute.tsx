"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import LoadingPage from "@/app/loading";

export default function ProtectedRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	const token = useSelector(selectCurrentToken);
	const router = useRouter();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (isMounted && !token) router.replace("/login");
	}, [isMounted, token, router]);

	if (!isMounted) return null;
	if (!token) <LoadingPage />;

	return <>{children}</>;
}
