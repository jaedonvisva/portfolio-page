import { CanvasBg } from "@/components/canvas-bg"
import { Header } from "@/components/portfolio/header"
import { About } from "@/components/portfolio/about"
import { Experience } from "@/components/portfolio/experience"
import { Projects } from "@/components/portfolio/projects"
import { Footer } from "@/components/portfolio/footer"

export default function Page() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <CanvasBg />
      <div className="relative z-10 mx-auto max-w-[680px] px-6 py-12 md:py-24 animate-in fade-in duration-700">
        <Header />
        <About />
        <div className="h-px bg-border my-10 md:my-14" role="separator" />
        <Experience />
        <div className="h-px bg-border my-10 md:my-14" role="separator" />
        <Projects />
        <Footer />
      </div>
    </main>
  )
}
