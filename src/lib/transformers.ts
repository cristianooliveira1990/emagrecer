import type { WPPost, WPCategory, WPTag, WPAuthor, WPImage } from '../types/wordpress';
import type { Post, Category, Tag, Author, Image, SEO, CategoryWithPosts, TagWithPosts, AuthorWithPosts, PaginatedResult } from '../types';

export function transformImage(wpImage: WPImage | null): Image | null {
  if (!wpImage) return null;

  return {
    src: wpImage.sourceUrl,
    alt: wpImage.altText || '',
    width: wpImage.mediaDetails?.width ?? wpImage.width ?? 800,
    height: wpImage.mediaDetails?.height ?? wpImage.height ?? 600,
    sizes: wpImage.mediaDetails?.sizes?.map((size) => ({
      src: size.sourceUrl,
      width: size.width,
      height: size.height,
      mimeType: size.mimeType,
    })),
  };
}

export function transformAuthor(wpAuthor: WPAuthor): Author {
  return {
    id: wpAuthor.id,
    name: wpAuthor.name,
    slug: wpAuthor.slug,
    description: wpAuthor.description || '',
    avatar: wpAuthor.avatar ? transformImage({
      ...wpAuthor.avatar,
      sourceUrl: wpAuthor.avatar.url,
      altText: '',
      width: wpAuthor.avatar.width,
      height: wpAuthor.avatar.height,
    } as WPImage) : null,
    url: wpAuthor.url,
    postCount: wpAuthor.posts?.nodes.length || 0,
  };
}

export function transformCategory(wpCategory: WPCategory): Category {
  return {
    id: wpCategory.id,
    name: wpCategory.name,
    slug: wpCategory.slug,
    description: wpCategory.description || '',
    count: wpCategory.count,
    uri: wpCategory.uri,
  };
}

export function transformTag(wpTag: WPTag): Tag {
  return {
    id: wpTag.id,
    name: wpTag.name,
    slug: wpTag.slug,
    description: wpTag.description || '',
    count: wpTag.count,
    uri: wpTag.uri,
  };
}

export function transformSEO(wpSEO: WPPost['seo']): SEO | null {
  if (!wpSEO) return null;
  return {
    title: wpSEO.title,
    metaDesc: wpSEO.metaDesc,
    canonical: wpSEO.canonical,
    opengraphTitle: wpSEO.opengraphTitle,
    opengraphDescription: wpSEO.opengraphDescription,
    opengraphImage: wpSEO.opengraphImage ? transformImage({
      ...wpSEO.opengraphImage,
      width: 1200,
      height: 630,
    } as WPImage) : null,
    twitterTitle: wpSEO.twitterTitle,
    twitterDescription: wpSEO.twitterDescription,
    twitterImage: wpSEO.twitterImage ? transformImage({
      ...wpSEO.twitterImage,
      width: 1200,
      height: 630,
    } as WPImage) : null,
    metaRobotsNoindex: wpSEO.metaRobotsNoindex,
    metaRobotsNofollow: wpSEO.metaRobotsNofollow,
  };
}

export function transformPost(wpPost: WPPost): Post {
  return {
    id: wpPost.id,
    slug: wpPost.slug,
    title: wpPost.title,
    excerpt: wpPost.excerpt,
    content: wpPost.content,
    date: wpPost.date,
    modified: wpPost.modified,
    featuredImage: wpPost.featuredImage?.node ? transformImage(wpPost.featuredImage.node) : null,
    author: transformAuthor(wpPost.author.node),
    categories: wpPost.categories.nodes.map(transformCategory),
    tags: wpPost.tags.nodes.map(transformTag),
    seo: transformSEO(wpPost.seo),
    readingTime: wpPost.readingTime ?? Math.ceil(wpPost.content.length / 1000),
    uri: wpPost.uri,
  };
}

export function transformCategoryWithPosts(wpCategory: WPCategory & { posts: { nodes: WPPost[]; pageInfo: { hasNextPage: boolean; hasPreviousPage: boolean; startCursor: string | null; endCursor: string | null } } }): CategoryWithPosts {
  return {
    ...transformCategory(wpCategory),
    posts: {
      nodes: wpCategory.posts.nodes.map(transformPost),
      pageInfo: wpCategory.posts.pageInfo,
    },
  };
}

export function transformTagWithPosts(wpTag: WPTag & { posts: { nodes: WPPost[]; pageInfo: { hasNextPage: boolean; hasPreviousPage: boolean; startCursor: string | null; endCursor: string | null } } }): TagWithPosts {
  return {
    ...transformTag(wpTag),
    posts: {
      nodes: wpTag.posts.nodes.map(transformPost),
      pageInfo: wpTag.posts.pageInfo,
    },
  };
}

export function transformAuthorWithPosts(wpAuthor: WPAuthor & { posts: { nodes: WPPost[]; pageInfo: { hasNextPage: boolean; hasPreviousPage: boolean; startCursor: string | null; endCursor: string | null } } }): AuthorWithPosts {
  return {
    ...transformAuthor(wpAuthor),
    posts: {
      nodes: wpAuthor.posts.nodes.map(transformPost),
      pageInfo: wpAuthor.posts.pageInfo,
    },
  };
}

export function transformPaginatedPosts(response: { nodes: WPPost[]; pageInfo: { hasNextPage: boolean; hasPreviousPage: boolean; startCursor: string | null; endCursor: string | null } }): PaginatedResult<Post> {
  return {
    nodes: response.nodes.map(transformPost),
    pageInfo: response.pageInfo,
  };
}