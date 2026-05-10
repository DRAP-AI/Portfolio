import SingleSkill from "./SingleSkill";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { SiTypescript } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { SiRedux } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaNode } from "react-icons/fa";
import { FaJava } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { motion } from "framer-motion";
import { fadeIn } from "../../lib/framerMotion/variants";
import { DiPython } from "react-icons/di";
import { FaFigma } from "react-icons/fa";
import { PiFileCpp } from "react-icons/pi";
import { SiThreedotjs } from "react-icons/si";


const skills = [
  {
    skill: "HTML",
    icon: FaHtml5,
    color: "text-orange-500",
    bgColor: "from-orange-500/20 to-red-500/20",
    proficiency: "Expert",
    progress: 99
  },
  {
    skill: "CSS",
    icon: FaCss3Alt,
    color: "text-blue-500",
    bgColor: "from-blue-500/20 to-cyan-500/20",
    proficiency: "Expert",
    progress: 80
  },
  {
    skill: "JavaScript",
    icon: IoLogoJavascript,
    color: "text-yellow-400",
    bgColor: "from-yellow-400/20 to-orange-400/20",
    proficiency: "Intermediate",
    progress: 85
  },
  {
    skill: "TypeScript",
    icon: SiTypescript,
    color: "text-blue-400",
    bgColor: "from-blue-400/20 to-blue-600/20",
    proficiency: "Beginner",
    progress: 50
  },
  {
    skill: "ReactJS",
    icon: FaReact,
    color: "text-cyan-400",
    bgColor: "from-cyan-400/20 to-blue-400/20",
    proficiency: "Advanced",
    progress: 100
  },
  {
    skill: "Figma",
    icon: FaFigma,
    color: "text-purple-500",
    bgColor: "from-purple-500/20 to-pink-500/20",
    proficiency: "Expert",
    progress: 70
  },
  {
    skill: "TailwindCSS",
    icon: RiTailwindCssFill,
    color: "text-cyan-400",
    bgColor: "from-cyan-400/20 to-teal-400/20",
    proficiency: "Expert",
    progress: 92
  },
  {
    skill: "Node.js",
    icon: FaNode,
    color: "text-green-500",
    bgColor: "from-green-500/20 to-emerald-500/20",
    proficiency: "Intermediate",
    progress: 80
  },
  {
    skill: "Express.js",
    icon: SiExpress,
    color: "text-gray-300",
    bgColor: "from-gray-300/20 to-gray-500/20",
    proficiency: "Intermediate",
    progress: 70
  },
  {
    skill: "Python",
    icon: DiPython,
    color: "text-green-400",
    bgColor: "from-green-400/20 to-green-600/20",
    proficiency: "Expert",
    progress: 72
  },
  {
    skill: "MongoDB",
    icon: SiMongodb,
    color: "text-green-400",
    bgColor: "from-green-400/20 to-green-600/20",
    proficiency: "Intermediate",
    progress: 75
  },
  {
    skill: "Java",
    icon: FaJava,
    color: "text-red-400",
    bgColor: "from-red-400/20 to-orange-400/20",
    proficiency: "Intermediate",
    progress: 60
  },
  {
    skill: "C++",
    icon: PiFileCpp,
    color: "text-blue-400",
    bgColor: "from-blue-400/20 to-blue-600/20",
    proficiency: "Intermediate",
    progress: 65
  },
  {
    skill: "Three.js",
    icon: SiThreedotjs,
    color: "text-gray-300",
    bgColor: "from-gray-300/20 to-gray-500/20",
    proficiency: "Beginner",
    progress: 40
  }
];

const AllSkills = () => {
  return (
    <div className="w-full">
      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
        Our Skills
      </h3>
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.3 }}
        className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6 mt-5"
      >
        {skills.map((item, index) => (
          <SingleSkill
            key={index}
            imgSvg={<item.icon />}
            text={item.skill}
            proficiency={item.proficiency}
            progress={item.progress}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default AllSkills;
