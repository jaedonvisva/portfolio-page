"use client"

import { useEffect, useRef, useCallback } from "react"

export function CanvasBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const dotsRef = useRef<{ x: number; y: number; baseX: number; baseY: number; vx: number; vy: number }[]>([])
  const isDark = true

  const initDots = useCallback((width: number, height: number) => {
    const spacing = 32
    const dots: typeof dotsRef.current = []
    for (let x = spacing; x < width; x += spacing) {
      for (let y = spacing; y < height; y += spacing) {
        dots.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
        })
      }
    }
    dotsRef.current = dots
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
      initDots(window.innerWidth, window.innerHeight)
    }

    resize()
    window.addEventListener("resize", resize)

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouse)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouse)
    }
  }, [initDots])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const draw = () => {
      const w = canvas.style.width ? parseInt(canvas.style.width) : window.innerWidth
      const h = canvas.style.height ? parseInt(canvas.style.height) : window.innerHeight

      ctx.clearRect(0, 0, w, h)

      const dotColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"
      const dotHighlight = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)"
      const mouse = mouseRef.current
      const radius = 120

      for (const dot of dotsRef.current) {
        dot.x += dot.vx
        dot.y += dot.vy

        const driftLimit = 6
        if (Math.abs(dot.x - dot.baseX) > driftLimit) dot.vx *= -1
        if (Math.abs(dot.y - dot.baseY) > driftLimit) dot.vy *= -1

        const dx = mouse.x - dot.x
        const dy = mouse.y - dot.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const t = Math.max(0, 1 - dist / radius)

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, 1 + t * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = t > 0 ? dotHighlight : dotColor
        ctx.globalAlpha = t > 0 ? 0.12 + t * 0.5 : 1
        ctx.fill()
        ctx.globalAlpha = 1
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ width: "100%", height: "100%" }}
    />
  )
}
