import { works } from "@/data/constants"
import { GitCommit } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Work = ({ id }) => {
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

          <div className="flex justify-between">
            <div>
              <h2 className="text-[2.5rem] text-white font-bold">{works.title}</h2>
              <p className="text-[1.5rem]">{works.description}</p>
              <ul className="flex flex-col gap-1.5 text-2xl">
                {works.technologies.map((tech) => (
                  <li key={tech}>◉ {tech}</li>
                ))}
              </ul>
              <Link href={works.liveUrl} target="_blank" rel="noopener noreferrer">
                <span className="flex items-center gap-4 text-white mt-2.5 underline text-2xl font-bold">
                  Explore this project <GitCommit/> 
                </span>
              </Link>
            </div>
            <Image src={'/hero-bg.webp'} width={500} height={100}  alt="poject" className="rounded-3xl"/>
          </div>

        </div>
        </div>
      </section>
  )
}

export default Work
