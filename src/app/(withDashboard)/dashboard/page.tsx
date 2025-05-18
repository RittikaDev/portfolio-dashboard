import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";

const DashboardPage = async () => {
	const session = await getServerSession(authOptions);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-10">
			{session?.user && (
				<>
					<h1 className="text-4xl font-semibold text-center text-gray-800 dark:text-gray-500 mb-4">
						Welcome, {session?.user?.name}
					</h1>
					<h2 className="text-2xl text-center text-gray-600 mb-6">
						Logged-in user email:{" "}
						<span className="font-semibold">{session?.user?.email}</span>
					</h2>
					<div className="mb-6">
						<Image
							src={
								session?.user?.image ||
								"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
							}
							width={120}
							height={120}
							alt="user image"
							className="mx-auto rounded-full border-4 border-blue-500"
						/>
					</div>
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

export default DashboardPage;
