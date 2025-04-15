import { ExternalLinkIcon, GithubIcon } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  github: string
  demo?: string
}

export function ProjectCard({ title, description, technologies, github, demo }: ProjectCardProps) {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-md p-4 hover:shadow-md dark:hover:border-gray-700 transition-all">
      <h3 className="font-medium text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, index) => (
          <span key={index} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-3 text-sm">
        <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
          <GithubIcon className="w-4 h-4" />
          GitHub
        </a>
        {demo && (
          <a href={demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
            <ExternalLinkIcon className="w-4 h-4" />
            Demo
          </a>
        )}
      </div>
    </div>
  )
}
