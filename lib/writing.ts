export interface Series {
  slug: string
  title: string
  dek: string
}

export interface Post {
  slug: string
  title: string
  dek: string
  date: string
  tags: string[]
  series?: string
  part?: number
}

export const series: Series[] = [
  {
    slug: "autodiff-from-scratch",
    title: "building a reverse-mode autodiff engine",
    dek: "Scalar autodiff to batched tensors, toward a transformer trained from raw gradients.",
  },
]

export const posts: Post[] = [
  {
    slug: "scalars-to-tensors",
    title: "Part 1: scalars to tensors, backprop by hand",
    dek: "What backpropagation actually is, worked out by hand and then in code, from a single scalar to batched tensors.",
    date: "2026-07-07",
    tags: ["autodiff", "machine learning", "python"],
    series: "autodiff-from-scratch",
    part: 1,
  },
]

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getSeries(slug: string): Series | undefined {
  return series.find((s) => s.slug === slug)
}

export function getSeriesPosts(seriesSlug: string): Post[] {
  return posts
    .filter((p) => p.series === seriesSlug)
    .sort((a, b) => (a.part ?? 0) - (b.part ?? 0))
}

// A post nested in a series routes at /writing/<series-slug>/<post-slug>;
// a standalone post routes at /writing/<post-slug>.
export function getPostHref(post: Post): string {
  return post.series ? `/writing/${post.series}/${post.slug}` : `/writing/${post.slug}`
}
