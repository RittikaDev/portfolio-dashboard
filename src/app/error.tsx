"use client";

import { useEffect } from "react";

const ErrorPage = ({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	useEffect(() => {
		const el = document.getElementById("error-message");
		if (el) {
			el.classList.add("animate-shake");
			const timer = setTimeout(() => el.classList.remove("animate-shake"), 600);
			return () => clearTimeout(timer);
		}
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-red-200 via-red-300 to-red-400 dark:from-gray-800 dark:via-gray-900 dark:to-black px-6">
			<div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-lg w-full p-10 text-center">
				<div className="mx-auto mb-6 w-24 h-24 rounded-full bg-red-600 text-white flex items-center justify-center text-5xl drop-shadow-lg">
					&#9888;
				</div>

				<h1 className="text-4xl font-extrabold text-red-700 dark:text-red-400 mb-4">
					Oops! Something went wrong.
				</h1>

				<p
					id="error-message"
					className="text-lg text-gray-700 dark:text-gray-300 bg-red-50 dark:bg-red-900 rounded-lg p-4 mb-8 select-text border border-red-300 dark:border-red-700"
					title="Error details"
				>
					{error.message || "An unexpected error occurred."}
				</p>

				<button
					onClick={reset}
					className="inline-block px-8 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 active:scale-95 transition-transform duration-150 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-700"
					aria-label="Retry"
				>
					Try Again
				</button>
			</div>
		</div>
	);
};

export default ErrorPage;
