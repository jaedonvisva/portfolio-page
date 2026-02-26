import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

interface Project {
  name: string
  description: string
  href?: string
  logo: string
}

const projects: Project[] = [
  {
    name: "WatMarket",
    description: "Prediction market for the University of Waterloo",
    href: "https://watmarket.ca",
    logo: "/logos/watmarket.jpg",
  },
  {
    name: "Neuroblocks",
    description: "No-code app development platform for brain-computer interfaces",
    href: "https://dorahacks.io/buidl/21627",
    logo: "/logos/neuroblocks.jpg",
  },
]

export function Projects() {
  return (
    <section>
      <h2 className="text-sm font-mono uppercase tracking-[0.12em] text-muted-foreground mb-6 md:mb-8">
        Projects
      </h2>
      <div className="space-y-5">
        {projects.map((project) => (
          <div key={project.name}>
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-3.5"
              >
                <div className="shrink-0 mt-[3px]">
                  <Image
                    src={project.logo}
                    alt={`${project.name} logo`}
                    width={24}
                    height={24}
                    className="rounded-[4px] object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-base md:text-lg font-medium text-foreground group-hover:text-muted-foreground transition-colors">
                      {project.name}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-[3px]" aria-hidden="true" />
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed mt-0.5">
                    {project.description}
                  </p>
                </div>
              </a>
            ) : (
              <div className="flex gap-3.5">
                <div className="shrink-0 mt-[3px]">
                  <Image
                    src={project.logo}
                    alt={`${project.name} logo`}
                    width={24}
                    height={24}
                    className="rounded-[4px] object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-base md:text-lg font-medium text-foreground">
                    {project.name}
                  </span>
                  <p className="text-base text-muted-foreground leading-relaxed mt-0.5">
                    {project.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
