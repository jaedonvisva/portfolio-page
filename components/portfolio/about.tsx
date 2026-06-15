"use client"

import Image from "next/image"
import useSWR from "swr"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useMagnet } from "@/hooks/use-magnet"

interface NowPlaying {
  isPlaying: boolean
  title?: string
  artist?: string
  songUrl?: string
  albumArt?: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const SCRAMBLE_CHARS = "abcdefghijklmnopqrstuvwxyz.,- "

function useTextScramble(target: string, delay = 100) {
  const [display, setDisplay] = useState(target)
  const frame = useRef(0)
  const iteration = useRef(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      iteration.current = 0
      const animate = () => {
        setDisplay(
          target
            .split("")
            .map((char, i) => {
              if (char === " ") return " "
              if (i < iteration.current) return target[i]
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
            })
            .join("")
        )
        iteration.current += 0.5
        if (iteration.current < target.length) {
          frame.current = requestAnimationFrame(animate)
        } else {
          setDisplay(target)
        }
      }
      frame.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(frame.current)
    }
  }, [target, delay])

  return display
}

function MagneticLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  const magnet = useMagnet(0.15)
  return (
    <a
      ref={magnet.ref as React.RefObject<HTMLAnchorElement>}
      onMouseMove={magnet.onMouseMove}
      onMouseLeave={magnet.onMouseLeave}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`ml-1 inline-flex items-baseline gap-2 text-foreground hover:text-muted-foreground transition-colors ${className ?? ""}`}
    >
      {children}
    </a>
  )
}

function PlayingAnimation() {
  return (
    <span className="inline-flex items-end gap-[1.5px] h-3 w-3 relative top-px">
      <motion.span
        className="w-[1.5px] bg-foreground block"
        animate={{ height: ["25%", "100%", "25%"] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="w-[1.5px] bg-foreground block"
        animate={{ height: ["50%", "90%", "30%"] }}
        transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
      />
      <motion.span
        className="w-[1.5px] bg-foreground block"
        animate={{ height: ["75%", "30%", "80%"] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      />
    </span>
  )
}

function NowPlayingInline() {
  const { data, isLoading } = useSWR<NowPlaying>(
    "/api/spotify/now-playing",
    fetcher,
    { refreshInterval: 30000 }
  )

  if (isLoading) {
    return (
      <span className="text-muted-foreground/50">...</span>
    )
  }

  if (data?.isPlaying && data.title) {
    return (
      <MagneticLink
        href={data.songUrl ?? "#"}
        className="group"
      >
        {data.albumArt && (
          <Image
            src={data.albumArt}
            alt={data.title}
            width={16}
            height={16}
            className="relative top-[2px] rounded-[3px] object-cover"
          />
        )}
        <span className="underline decoration-foreground/20 underline-offset-[3px] group-hover:decoration-foreground/60">
          {data.title}
          {" by "}
          {data.artist}
        </span>
        <PlayingAnimation />
      </MagneticLink>
    )
  }

  return (
    <span className="text-muted-foreground/50 italic">
      <motion.span
        className="not-italic mr-1 inline-block"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        💤
      </motion.span>
      pretty quiet
    </span>
  )
}

export function About() {
  const heading = useTextScramble("software, data, and the space between.", 200)

  return (
    <section>
      <h1 className="text-[1.8rem] md:text-[2.2rem] font-semibold tracking-[-0.035em] leading-[1.15] text-foreground text-balance">
        {heading}
      </h1>
      <p className="mt-5 md:mt-6 text-base md:text-lg leading-[1.75] text-muted-foreground">
        {"i'm jaedon, an engineering student at the "}
        <MagneticLink href="https://uwaterloo.ca">
          <Image
            src="/logos/waterloo.jpg"
            alt="University of Waterloo logo"
            width={16}
            height={16}
            className="relative top-[2px] rounded-[3px] object-cover"
          />
          university of waterloo
        </MagneticLink>
        {". i just finished an internship at "}
        <MagneticLink href="https://berkeleystreet.ai/">
          <Image
            src="/logos/berkeley-street-capital.jpg"
            alt="Berkeley Street Capital logo"
            width={16}
            height={16}
            className="relative top-[2px] rounded-[3px] object-cover"
          />
          berkeley street capital
        </MagneticLink>
        {" where i worked on crypto microstructure signal generation. this fall, i'll be joining "}
        <MagneticLink href="https://shopify.com">
          <Image
            src="/logos/shopify.svg"
            alt="Shopify logo"
            width={16}
            height={16}
            className="relative top-[2px] rounded-[3px] object-cover"
          />
          shopify
        </MagneticLink>
        {" as a machine learning engineer intern."}
      </p>
      <p className="mt-4 text-base md:text-lg leading-[1.75] text-muted-foreground">
        {"in my free time, i like to play basketball, ski, play the guitar, and listen to music; right now it's "}
        <NowPlayingInline />
      </p>
    </section>
  )
}
