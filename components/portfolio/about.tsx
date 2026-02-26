"use client"

import Image from "next/image"
import useSWR from "swr"

interface NowPlaying {
  isPlaying: boolean
  title?: string
  artist?: string
  songUrl?: string
  albumArt?: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

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
      <a
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-1 inline-flex items-baseline gap-2 text-foreground hover:text-muted-foreground transition-colors group"
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
      </a>
    )
  }

  return (
    <span className="text-muted-foreground/50 italic"><span className="not-italic mr-1">💤</span>pretty quiet</span>
  )
}

export function About() {
  return (
    <section>
      <h1 className="text-[1.8rem] md:text-[2.2rem] font-semibold tracking-[-0.035em] leading-[1.15] text-foreground text-balance">
        software, data, and the space between.
      </h1>
      <p className="mt-5 md:mt-6 text-base md:text-lg leading-[1.75] text-muted-foreground">
        {"i'm jaedon, an engineering student at the "}
        <a
          href="https://uwaterloo.ca"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 inline-flex items-baseline gap-2 text-foreground hover:text-muted-foreground transition-colors"
        >
          <Image
            src="/logos/waterloo.jpg"
            alt="University of Waterloo logo"
            width={16}
            height={16}
            className="relative top-[2px] rounded-[3px] object-cover"
          />
          university of waterloo
        </a>
        {". currently interning at "}
        <a
          href="https://berkeleystreet.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 inline-flex items-baseline gap-2 text-foreground hover:text-muted-foreground transition-colors"
        >
          <Image
            src="/logos/berkeley-street-capital.jpg"
            alt="Berkeley Street Capital logo"
            width={16}
            height={16}
            className="relative top-[2px] rounded-[3px] object-cover"
          />
          berkeley street capital
        </a>
        {" doing quantitative research on crypto microstructure signal generation."}
      </p>
      <p className="mt-4 text-base md:text-lg leading-[1.75] text-muted-foreground">
        {"in my free time, i like to play basketball, ski, play the guitar, and listen to music; right now it's "}
        <NowPlayingInline />
        {"."}
      </p>
    </section>
  )
}
