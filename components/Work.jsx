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

        <div className="p-10 md:p-20">
          <h2 className="text-[3.4rem] text-center font-black text-white mb-3">Selected Works</h2>
          <h3 className="text-lg text-center text-zinc-300 mb-8">Here are some of our recent Client Works</h3>

          {loading ? (
            <p className="text-center text-zinc-300">Loading...</p>
          ) : project ? (
            <div className="flex justify-between gap-10">
              <div>
                <h2 className="text-[2.5rem] text-white font-bold">{project.title}</h2>
                <p className="text-[1.5rem] text-zinc-300">{project.description}</p>
                <ul className="flex flex-col gap-1.5 text-2xl">
                  {project.technologies?.map((tech) => (
                    <li key={tech} className="text-zinc-300">◉ {tech}</li>
                  ))}
                </ul>
                {(project.liveUrl || project.sourceUrl) && (
                  <div className="flex items-center gap-4 text-white mt-2.5">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-2xl font-bold"
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
                          className="hover:opacity-80 transition cursor-pointer"
                        />
                      </Link>
                    )}
                  </div>
                )}
              </div>
              {project.image && (
                <img src={project.image} width={500} height={400} alt={project.title} className="rounded-3xl object-cover"/>
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
