"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

const Skills = () => {
  const skills = {
    data: [
      { id: "1", title: "JavaScript" },
      { id: "2", title: "TypeScript" },
      { id: "3", title: "React" },
      { id: "4", title: "Redux" },
      { id: "5", title: "Next.js" },
      { id: "6", title: "Angular" },
      { id: "7", title: "Node.js" },
      { id: "8", title: "Express.js" },
      { id: "9", title: "MongoDB" },
      { id: "10", title: "Firebase" },
      { id: "11", title: "Tailwind CSS" },
      { id: "12", title: "SCSS" },
      { id: "13", title: "Jasmine" },
      { id: "14", title: "Karma" },
      { id: "15", title: ".Net Core" },
      { id: "16", title: "Oracle" },
      { id: "17", title: "SQL" },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto my-40">
      {/* <h2 className="mb-8 text-center text-3xl font-medium capitalize">
				Things I am Good At
			</h2> */}
      <h1 className="mb-8 pb-10 text-center font-bold text-4xl md:text-5xl pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-teal-900 to-teal-400 bg-clip-text leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Things I am Good At
      </h1>
      <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
        {skills.data.map((skill, index) => (
          <motion.li
            className=" border border-slate-200 rounded-2xl bg-slate-100 px-5 py-3 dark:bg-white/10 dark:text-white/80"
            key={skill.id}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            {skill.title}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
