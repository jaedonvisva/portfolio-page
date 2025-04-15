export type CustomProject = {
    name: string
    description: string
    technologies: string[]
    languages: string[]
    github?: string
    demo?: string
    imageUrl?: string
  }
  
  export const customProjects: CustomProject[] = [
    {
        name: "NeuroBlocks",
        description: "A visual programming tool that enables users to build Brain-Computer Interface (BCI) applications through drag-and-drop code blocks. Designed for accessibility, it abstracts BrainFlow API functions into modular blocks, making it easy to prototype real-time EEG-based applications without writing code.",
        technologies: ["Next.js", "Tailwind CSS", "React", "Flask", "BrainFlow", "WebSockets"],
        languages: ["TypeScript", "Python", "CSS"],
        demo: "https://dorahacks.io/buidl/21627",
      },
  ]
  