import { Spotlight } from "@/components/ui/spotlight";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import ShinyButton from "../ui/shiny-button";

const AboutMe = () => {
  return (
    <section className="relative md:pt-10 md:pb-56 2xl:pb-28 dark:bg-darkTheme">
      <div className="hidden md:block">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:top-40"
          fill="white"
        />
      </div>
      <div className="hidden md:block">
        <TextHoverEffect text="ABOUT" />
      </div>
      <div className="w-full md:absolute md:top-0 lg:translate-y-[50%]">
        <div className="flex justify-center">
          <div className="md:col-span-4 space-y-6 text-center md:text-left">
            <div className="space-y-4 flex flex-col items-center text-center">
              <h1 className="font-bold text-4xl md:text-5xl pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-teal-900 to-teal-400 bg-clip-text leading-none text-transparent dark:from-white dark:to-slate-900/10">
                About Me
              </h1>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                I am a passionate Full-Stack Developer with a strong focus on
                building responsive, high-performance web applications. My
                expertise lies in React.js, Next.js, Angular,TypeScript,
                Redux-Toolkit, Express.js, Mongoose, Tailwind CSS and .Net,
                Oracle.
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                I started my journey with a degree in Computer Science, then
                expanded my skills as a self-taught programmer, constantly
                pushing the boundaries of modern web development. I enjoy
                crafting scalable, dynamic applications, solving complex
                problems, and staying up-to-date with the ever-evolving tech
                landscape.
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                When I’m not coding, I’m usually reading, exploring new places,
                or enjoying a great cup of coffee. I believe in continuous
                learning and am always excited to take on new challenges and
                collaborations!
              </p>
            </div>

            <div className="flex text-center justify-center">
              <a className="w-full block" href="/RITTIKA_DEV.pdf" download>
                <ShinyButton>Download Resume</ShinyButton>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
