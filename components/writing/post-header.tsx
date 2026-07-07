export function PostHeader({
  title,
  date,
  tags,
}: {
  title: string
  date: string
  tags: string[]
}) {
  const formatted = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })

  return (
    <div className="mb-12 md:mb-14">
      <h1 className="text-[1.8rem] md:text-[2.2rem] font-semibold tracking-[-0.035em] leading-[1.15] text-foreground text-balance">
        {title}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono text-muted-foreground/50 tracking-wide">
        <span>{formatted}</span>
        <span className="text-muted-foreground/25">·</span>
        <span>[{" "}{tags.join(", ")}{" "}]</span>
      </div>
    </div>
  )
}
