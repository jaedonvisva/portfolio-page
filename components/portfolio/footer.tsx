const links = [
  { label: "LinkedIn", href: "https://linkedin.com/in/jaedonvisva" },
  { label: "GitHub", href: "https://github.com/jaedonvisva" },
  { label: "Twitter", href: "https://x.com/jaedonvisva" },
]

export function Footer() {
  return (
    <footer className="mt-16 md:mt-20 pt-8 border-t border-border">
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            className="text-base text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
