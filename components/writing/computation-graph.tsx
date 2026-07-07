export function ComputationGraph() {
  return (
    <figure className="mb-6 mt-2">
      <svg
        viewBox="0 0 660 240"
        className="w-full text-foreground"
        role="img"
        aria-label="Computation graph for L = tanh(a times b plus c): a, b, and c are leaf nodes with no incoming edges; a and b feed into a multiply node; that result and c feed into an add node; that result feeds into a tanh node, whose value is L"
      >
        <defs>
          <marker
            id="cg-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-muted-foreground/50" />
          </marker>
        </defs>

        {/* edges */}
        <g className="stroke-muted-foreground/50" strokeWidth="1.5" markerEnd="url(#cg-arrow)" fill="none">
          <path d="M 73 53 L 203 92" />
          <path d="M 73 147 L 203 108" />
          <path d="M 257 108 L 383 143" />
          <path d="M 306 198 L 385 162" />
          <path d="M 438 150 L 516 150" />
        </g>

        {/* leaf nodes: a, b, c have no incoming edges, only outgoing */}
        <circle cx="56" cy="48" r="18" className="fill-muted stroke-border" strokeWidth="1.5" />
        <text x="56" y="48" textAnchor="middle" dominantBaseline="central" className="fill-foreground font-mono text-[15px]">a</text>

        <circle cx="56" cy="152" r="18" className="fill-muted stroke-border" strokeWidth="1.5" />
        <text x="56" y="152" textAnchor="middle" dominantBaseline="central" className="fill-foreground font-mono text-[15px]">b</text>

        <circle cx="290" cy="206" r="18" className="fill-muted stroke-border" strokeWidth="1.5" />
        <text x="290" y="206" textAnchor="middle" dominantBaseline="central" className="fill-foreground font-mono text-[15px]">c</text>

        {/* computed nodes: each has incoming edges, an _op, and holds the result of that op */}
        <circle cx="230" cy="100" r="26" className="fill-muted stroke-border" strokeWidth="1.5" />
        <text x="230" y="100" textAnchor="middle" dominantBaseline="central" className="fill-foreground font-mono text-[17px]">×</text>

        <circle cx="410" cy="150" r="26" className="fill-muted stroke-border" strokeWidth="1.5" />
        <text x="410" y="150" textAnchor="middle" dominantBaseline="central" className="fill-foreground font-mono text-[17px]">+</text>

        {/* tanh's result IS L, not a separate downstream node */}
        <rect x="520" y="122" width="96" height="56" rx="10" className="fill-muted stroke-border" strokeWidth="1.5" />
        <text x="568" y="150" textAnchor="middle" dominantBaseline="central" className="fill-foreground font-mono text-[14px]">tanh</text>

        {/* subscript labels: the actual data each node holds */}
        <g className="fill-muted-foreground font-mono text-[11px]">
          <text x="230" y="144" textAnchor="middle">a·b</text>
          <text x="410" y="194" textAnchor="middle">a·b + c</text>
          <text x="568" y="196" textAnchor="middle">L = tanh(a·b + c)</text>
        </g>
      </svg>
      <figcaption className="mt-3 text-center text-xs font-mono uppercase tracking-widest text-muted-foreground/50">
        the graph for L = tanh(a·b + c)
      </figcaption>
    </figure>
  )
}
