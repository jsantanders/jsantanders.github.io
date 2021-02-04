export type PageContext = {
  tag: string
  category: string
  currentPage: number
  prevPagePath: string
  nextPagePath: string
  hasPrevPage: boolean
  hasNextPage: boolean
  slug: string,
  translations: Array<string>,
  translatedLinks: Array<string>,
}

export type Node = {
  fields: {
    slug: string
    langKey: string
    categorySlug?: string
    tagSlugs?: string[]
  }
  timeToRead: number
  title : string
  category_id: string
  frontmatter: {
    date: string
    description: string
    category: string
    tags: string[]
    title: string
    socialImage?: {
      publicURL: string
    }
  }
  html: string
  id: string
}

export type Edge = {
  node: Node
}

export type Edges = Array<Edge>

export type AllMarkdownRemark = {
  edges: Edges
  group: {
    fieldValue: string
    totalCount: number
  }[]
}

export type MarkdownRemark = Node

export type SiteMetadata = {
  title: string
  disqusShortname: string
  url: string
  subtitle: string
  copyright: string
  menu: Page[]
  author: {
    name: string
    twitter: string
    github: string
    stackoverflow: string
  }
}

export type Page = {
  label: string
  path: string
}

export type Site = {
  siteMetadata: SiteMetadata
  menu: Array<Page>
  copyright: string
}

export type PageQuery = {
  site: Site
  markdownRemark: MarkdownRemark
  allMarkdownRemark: AllMarkdownRemark
}
