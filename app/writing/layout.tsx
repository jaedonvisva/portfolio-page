import { CanvasBg } from "@/components/canvas-bg"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/portfolio/footer"
import "katex/dist/katex.min.css"

export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <CanvasBg />
      <div className="relative z-10 mx-auto max-w-[680px] px-6 py-12 md:py-24 animate-in fade-in duration-700">
        <Navbar />
        {children}
        <Footer />
      </div>
    </main>
  )
}
