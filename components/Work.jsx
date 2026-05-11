"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { ref, get } from "firebase/database";
import { GitCommit } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Work = ({ id }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectsRef = ref(db, "projects");
        const snapshot = await get(projectsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const firstProject = Object.values(data)[0];
          setProject(firstProject);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  return (
    <section id={id} className="bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(#0000008b, #000000e6), url('/hero-bg.webp')`,
        }}>
        <div className="relative rounded-t-[100px] border border-zinc-700/50 bg-cover bg-center bg-no-repeat min-h-screen z-10"
        style={{
          background: 'black',
        }}>

        <div className="p-4 sm:p-8 md:p-20 lg:p-28">
          <h2 className="text-2xl sm:text-3xl md:text-[3.4rem] text-center font-black text-white mb-3">Selected Works</h2>
          <h3 className="text-sm sm:text-base md:text-lg text-center text-zinc-300 mb-6 sm:mb-8">Here are some of our recent Client Works</h3>

          {loading ? (
            <p className="text-center text-zinc-300">Loading...</p>
          ) : project ? (
            <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-10 items-start md:items-center">
              {project.image && (
                <div className="w-full md:hidden mb-4 order-first">
                  <img src={project.image} width={500} height={400} alt={project.title} className="rounded-3xl object-cover w-full h-auto"/>
                </div>
              )}
              <div className="w-full md:w-1/2">
                <h2 className="text-xl sm:text-2xl md:text-[2.5rem] text-white font-bold mb-2 sm:mb-3">{project.title}</h2>
                <p className="text-sm sm:text-base md:text-[1.5rem] text-zinc-300 mb-3 sm:mb-4 leading-relaxed">{project.description}</p>
                <ul className="flex flex-col gap-1 sm:gap-1.5 text-base sm:text-xl md:text-2xl mb-4">
                  {project.technologies?.map((tech) => (
                    <li key={tech} className="text-zinc-300">◉ {tech}</li>
                  ))}
                </ul>
                {(project.liveUrl || project.sourceUrl) && (
                  <div className="flex items-center gap-3 sm:gap-4 text-white mt-4 sm:mt-2.5 flex-wrap">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-sm sm:text-lg md:text-2xl font-bold hover:text-green transition-colors"
                      >
                        Explore this project
                      </Link>
                    )}
                    {project.sourceUrl && (
                      <Link
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex"
                      >
                        <Image
                          src="/github.webp"
                          alt="GitHub"
                          width={40}
                          height={40}
                          className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 hover:opacity-80 transition cursor-pointer"
                        />
                      </Link>
                    )}
                  </div>
                )}
              </div>
              {project.image && (
                <div className="hidden md:block w-full md:w-1/2">
                  <img src={project.image} width={500} height={400} alt={project.title} className="rounded-3xl object-cover w-full h-auto"/>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-zinc-300">No projects available</p>
          )}

        </div>
        </div>
      </section>
  )
}

export default Work
