interface ImageItem {
  src: string
  alt: string
  caption: string
}

export function ImagePair({ items }: { items: [ImageItem, ImageItem] }) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3">
      {items.map((item) => (
        <figure key={item.src} className="m-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.src}
            alt={item.alt}
            className="w-full rounded-lg border border-border bg-white"
          />
          <figcaption className="mt-2 text-center text-xs font-mono uppercase tracking-widest text-muted-foreground/50">
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
