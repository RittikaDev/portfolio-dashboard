"use client";

const ErrorPage = ({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
			<div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg w-full max-w-md text-center">
				<h1 className="text-2xl font-bold">Something went wrong!</h1>
			</div>

			<p className="mt-4 bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 px-5 py-3 rounded-lg shadow w-full max-w-md text-center">
				{error.message}
			</p>

			<button
				onClick={reset}
				className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition duration-200"
			>
				Try Again
			</button>
		</div>
	);
};

export default ErrorPage;
