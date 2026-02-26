import Image from "next/image"

interface Role {
  company: string
  title: string
  description: string
  href?: string
  period: string
  logo: string
}

const roles: Role[] = [
  {
    company: "Berkeley Street Capital",
    title: "Quantitative Research Intern",
    description: "Crypto microstructure signal generation",
    href: "https://berkeleystreetcapital.com",
    period: "W26",
    logo: "/logos/berkeley-street-capital.jpg",
  },
  {
    company: "Blackstone Energy",
    title: "Machine Learning Intern",
    description: "ML pipelines for large-scale energy demand forecasting",
    href: "https://www.blackstoneenergy.com",
    period: "S25",
    logo: "/logos/blackstone.jpg",
  },
]

export function Experience() {
  return (
    <section>
      <h2 className="text-sm font-mono uppercase tracking-[0.12em] text-muted-foreground mb-6 md:mb-8">
        Experience
      </h2>
      <div className="space-y-6">
        {roles.map((role) => (
          <div key={role.company} className="flex gap-3.5">
            <div className="shrink-0 mt-[3px]">
              <Image
                src={role.logo}
                alt={`${role.company} logo`}
                width={24}
                height={24}
                className="rounded-[4px] object-cover"
              />
            </div>
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-2 min-w-0">
                  {role.href ? (
                    <a
                      href={role.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base md:text-lg font-medium text-foreground hover:text-muted-foreground transition-colors truncate"
                    >
                      {role.company}
                    </a>
                  ) : (
                    <span className="text-base md:text-lg font-medium text-foreground truncate">
                      {role.company}
                    </span>
                  )}
                </div>
                <span className="text-sm font-mono text-muted-foreground shrink-0">
                  {role.period}
                </span>
              </div>
              <div className="flex flex-col gap-1 mt-0.5">
                <div className="flex items-start gap-2 text-base text-muted-foreground">
                  <span className="text-muted-foreground/40 shrink-0 select-none">↳</span>
                  <span>{role.title}</span>
                </div>
                <div className="flex items-start gap-2 text-base text-muted-foreground pl-5">
                  <span className="text-muted-foreground/40 shrink-0 select-none">↳</span>
                  <span>{role.description}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
