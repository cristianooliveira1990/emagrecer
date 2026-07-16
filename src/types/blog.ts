import type { WPPost, WPCategory, WPTag, WPAuthor, WPImage, WPSEO } from './wordpress';

export interface Post {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  uri: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  featuredImage: Image | null;
  author: Author;
  categories: Category[];
  tags: Tag[];
  seo: SEO | null;
  readingTime: number;
  customFields: CustomFields;
}

export interface Image {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: ImageSize[];
}

export interface ImageSize {
  src: string;
  width: number;
  height: number;
  media?: string;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  description: string;
  avatar: Image;
  url: string;
  postsCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
  uri: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
  uri: string;
}

export interface SEO {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: Image;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: Image;
  noindex: boolean;
  nofollow: boolean;
}

export interface CustomFields {
  readingTime?: number;
  featuredVideo?: string;
  audioUrl?: string;
  relatedPosts?: string[];
  faq?: FAQItem[];
  tableOfContents?: TOCItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface PaginatedPosts {
  posts: Post[];
  pageInfo: PageInfo;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  language: string;
  postsPerPage: number;
  author: {
    name: string;
    email: string;
    twitter: string;
  };
  social: {
    twitter: string;
    instagram: string;
    youtube: string;
  };
  newsletter: {
    provider: 'convertkit' | 'mailchimp' | 'custom';
    actionUrl: string;
    hiddenFields?: Record<string, string>;
  };
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface Menu {
  items: NavigationItem[];
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  category?: string;
  date: string;
}

export interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: Image | null;
  category: Category | null;
  date: string;
  readingTime: number;
}

export interface ArticlePageData {
  post: Post;
  relatedPosts: RelatedPost[];
  tableOfContents: TOCItem[];
}

export interface CategoryPageData {
  category: Category;
  posts: PaginatedPosts;
}

export interface TagPageData {
  tag: Tag;
  posts: PaginatedPosts;
}

export interface AuthorPageData {
  author: Author;
  posts: PaginatedPosts;
}

export interface SearchPageData {
  query: string;
  results: SearchResult[];
  total: number;
}

export interface ArchivePageData {
  posts: PaginatedPosts;
  title: string;
  description: string;
}

export interface HomePageData {
  hero: HeroData;
  featuredPosts: Post[];
  latestPosts: PaginatedPosts;
  categories: Category[];
  newsletter: NewsletterData;
}

export interface HeroData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  image: Image;
}

export interface NewsletterData {
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
  privacyText: string;
}

export interface FooterData {
  siteName: string;
  description: string;
  copyright: string;
  navigation: {
    community: NavigationItem[];
    legal: NavigationItem[];
  };
  social: {
    instagram: string;
    twitter: string;
  };
}