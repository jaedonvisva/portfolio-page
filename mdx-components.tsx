import type { MDXComponents } from "mdx/types"
import Link from "next/link"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 text-lg md:text-xl font-semibold text-foreground tracking-[-0.01em] scroll-mt-24">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-base md:text-lg font-semibold text-foreground tracking-[-0.01em] scroll-mt-24">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-base md:text-lg leading-[1.75] text-muted-foreground mb-5">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <Link
        href={href ?? "#"}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-foreground underline decoration-foreground/20 underline-offset-[3px] hover:decoration-foreground/60 transition-colors"
      >
        {children}
      </Link>
    ),
    ul: ({ children }) => (
      <ul className="mb-5 ml-5 list-disc space-y-2 text-base md:text-lg leading-[1.75] text-muted-foreground marker:text-muted-foreground/40">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-5 ml-5 list-decimal space-y-2 text-base md:text-lg leading-[1.75] text-muted-foreground marker:text-muted-foreground/40">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="pl-1">{children}</li>,
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    blockquote: ({ children }) => (
      <blockquote className="mb-5 border-l-2 border-border pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-10 border-border" />,
    code: ({ children }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mb-6 overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 text-sm leading-relaxed font-mono text-foreground [&_code]:bg-transparent [&_code]:p-0">
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <div className="mb-6 overflow-x-auto rounded-lg border border-border">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-muted/50 font-mono text-xs uppercase tracking-wide text-muted-foreground">
        {children}
      </thead>
    ),
    th: ({ children }) => (
      <th className="border-b border-border px-3 py-2 text-left font-medium whitespace-nowrap">
        {children}
      </th>
    ),
    tr: ({ children }) => (
      <tr className="[&:last-child>td]:border-b-0">{children}</tr>
    ),
    td: ({ children }) => (
      <td className="border-b border-border px-3 py-2 align-top text-muted-foreground">
        {children}
      </td>
    ),
    img: ({ src, alt }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={typeof src === "string" ? src : undefined}
        alt={alt ?? ""}
        className="mb-6 rounded-lg border border-border"
      />
    ),
    ...components,
  }
}
