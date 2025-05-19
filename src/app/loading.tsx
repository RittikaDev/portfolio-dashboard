const orbitAnimation = {
	animation: "orbit 1.5s linear infinite",
	transformOrigin: "center",
};

const keyframes = `
	@keyframes orbit {
	  0% {
		transform: rotate(0deg) translateX(1.25rem) rotate(0deg);
	  }
	  100% {
		transform: rotate(360deg) translateX(1.25rem) rotate(-360deg);
	  }
	}
  `;

const LoadingPage = () => {
	return (
		<>
			<style>{keyframes}</style>
			<div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
				<div className="relative w-20 h-20">
					{/* ORBIT RING */}
					<div className="absolute inset-0 rounded-full border-4 border-emerald-300 opacity-40"></div>
					{/* ORBITING DOT */}
					<div
						className="absolute top-1/2 left-1/2 w-5 h-5 bg-emerald-600 rounded-full shadow-lg"
						style={{
							...orbitAnimation,
							top: "50%",
							left: "50%",
							marginTop: "-0.625rem",
							marginLeft: "1.25rem",
						}}
					/>
					{/* CENTER DOT */}
					<div className="absolute top-1/2 left-1/2 w-6 h-6 bg-emerald-500 rounded-full shadow-inner -translate-x-1/2 -translate-y-1/2"></div>
				</div>
			</div>
		</>
	);
};

export default LoadingPage;
