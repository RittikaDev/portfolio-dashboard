import InitialAnimation from "./initial-animation";

const TopSection = () => {
	return (
		<div className="flex justify-center">
			<InitialAnimation>
				<h1 className="mb-8 text-center font-bold text-4xl md:text-5xl pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-teal-900 to-teal-400 bg-clip-text leading-none text-transparent  dark:from-white dark:to-slate-900/10">
					All Projects
				</h1>
			</InitialAnimation>
		</div>
	);
};

export default TopSection;
