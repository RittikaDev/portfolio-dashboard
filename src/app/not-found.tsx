"use client";
import Link from "next/link";

const NotFoundPage = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center px-6">
			<h1 className="text-6xl font-extrabold text-red-600 dark:text-red-400">
				404
			</h1>
			<h2 className="mt-2 text-2xl font-semibold text-gray-700 dark:text-gray-300">
				Page Not Found
			</h2>
			<p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md">
				Sorry, the page you are looking for does not exist. It might have been
				moved, deleted or never existed.
			</p>
			<div className="mt-6 text-center">
				<Link
					href={`/`}
					className="inline-flex items-center justify-center px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition duration-200"
				>
					Back to Home
				</Link>
			</div>
		</div>
	);
};

export default NotFoundPage;
