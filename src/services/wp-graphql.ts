import { gql } from 'graphql-request';
import type { WPPost, WPCategory, WPTag, WPAuthor, WPPageInfo } from '../types/wordpress';

const WP_BASE_URL = 'https://cms.emagrecer.xx.kg';

function envVar(name: string): string | undefined {
  const val = (import.meta as any).env?.[name];
  return val && val !== 'undefined' ? val : undefined;
}
const SITE_URL = envVar('PUBLIC_SITE_URL') || envVar('SITE_URL') || 'https://emagrecer.xx.kg';
const WPGRAPHQL_URL = envVar('PUBLIC_WPGRAPHQL_URL') || envVar('WPGRAPHQL_URL') || 'https://cms.emagrecer.xx.kg/graphql';

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

interface RESTPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  modified: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string; media_details?: { width: number; height: number } }>;
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
    author?: Array<{ id: number; name: string; slug: string; description?: string; avatar_urls?: Record<string, string> }>;
  };
}

class WPGraphQLClient {
  private url: string;

  constructor() {
    this.url = WPGRAPHQL_URL;
  }

  async restGet<T>(endpoint: string): Promise<T | null> {
    try {
      const res = await fetch(`${WP_BASE_URL}/wp-json/wp/v2/${endpoint}`, {
        headers: { 'User-Agent': 'Emagrecer-Astro/1.0', 'Accept': 'application/json' },
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) return null;
      return await res.json() as T;
    } catch {
      return null;
    }
  }

  async request<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Emagrecer-Astro/1.0',
        },
        cache: 'no-store',
        body: JSON.stringify({ query, variables }),
        signal: AbortSignal.timeout(15000),
      });

      // Check HTTP status code
      if (!response.ok) {
        throw new Error(`GraphQL request failed with status ${response.status}`);
      }

      // Check content type
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('GraphQL endpoint returned non-JSON response');
      }

      const result: GraphQLResponse<T> = await response.json();

      // Check for GraphQL errors
      if (result.errors && result.errors.length > 0) {
        throw new Error(`GraphQL errors: ${result.errors.map(e => e.message).join(', ')}`);
      }

      if (!result.data) {
        throw new Error('GraphQL response missing data');
      }

      return result.data;
    } catch (error: unknown) {
      console.error(`[WPGraphQL] Request failed for URL: ${this.url}`, error);
      const empty = {} as T;
      return empty;
    }
  }

  async getPosts(first = 10, after?: string, where?: Record<string, unknown>) {
    const query = gql`
      query GetPosts($first: Int!, $after: String) {
        posts(first: $first, after: $after) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          nodes {
            id
            databaseId
            title
            slug
            uri
            excerpt
            content
            date
            modified
            featuredImage {
              node {
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                  file
                  sizes {
                    sourceUrl
                    width
                    height
                    mimeType
                  }
                }
              }
            }
            author {
              node {
                id
                name
                slug
                description
                avatar {
                  url
                  width
                  height
                }
                url
                posts {
                  nodes {
                    id
                  }
                }
              }
            }
            categories {
              nodes {
                id
                name
                slug
                description
                count
                uri
              }
            }
            tags {
              nodes {
                id
                name
                slug
                description
                count
                uri
              }
            }
          }
        }
      }
    `;

    const data = await this.request<{
      posts: {
        nodes: WPPost[];
        pageInfo: WPPageInfo;
      };
    }>(query, { first, after });

    if (data?.posts?.nodes?.length) {
      return data.posts;
    }

    const restPosts = await this.restGet<RESTPost[]>(`posts?per_page=${first}&_embed=1`);
    if (restPosts && restPosts.length > 0) {
      const nodes = restPosts.map((p) => ({
        id: String(p.id),
        databaseId: p.id,
        title: p.title.rendered,
        slug: p.slug,
        excerpt: p.excerpt.rendered,
        content: p.content.rendered,
        date: p.date,
        modified: p.modified,
        featuredImage: p._embedded?.['wp:featuredmedia']?.[0]
          ? {
              node: {
                sourceUrl: p._embedded['wp:featuredmedia'][0].source_url,
                altText: p._embedded['wp:featuredmedia'][0].alt_text,
                mediaDetails: p._embedded['wp:featuredmedia'][0].media_details,
              },
            }
          : null,
        author: p._embedded?.author?.[0]
          ? {
              node: {
                name: p._embedded.author[0].name,
                slug: p._embedded.author[0].slug,
                description: p._embedded.author[0].description || '',
                avatar: { url: p._embedded.author[0].avatar_urls?.['96'] || '' },
              },
            }
          : null,
        categories: p._embedded?.['wp:term']?.[0]
          ? { nodes: p._embedded['wp:term'][0].map((t: any) => ({ name: t.name, slug: t.slug })) }
          : { nodes: [] },
        tags: { nodes: [] },
        readingTime: Math.ceil(p.content.rendered.split(' ').length / 200),
      }));
      return { nodes, pageInfo: { hasNextPage: false, hasPreviousPage: false } };
    }

    return { nodes: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } };
  }

  async getPostBySlug(slug: string) {
    const query = gql`
      query GetPostBySlug($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
          id
          databaseId
          title
          slug
          uri
          excerpt
          content
          date
          modified
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
                file
                sizes {
                  sourceUrl
                  width
                  height
                  mimeType
                }
              }
            }
          }
          author {
            node {
              id
              name
              slug
              description
              avatar {
                url
                width
                height
              }
              url
              posts {
                nodes {
                  id
                }
              }
            }
          }
          categories {
            nodes {
              id
              name
              slug
              description
              count
              uri
            }
          }
          tags {
            nodes {
              id
              name
              slug
              description
              count
              uri
            }
          }
        }
      }
      `;

    const data = await this.request<{
      post: WPPost;
    }>(query, { id: slug, idType: 'SLUG' });

    return data?.post || null;
  }

  async getCategories(first = 100) {
    const query = gql`
      query GetCategories($first: Int!) {
        categories(first: $first, where: { hideEmpty: true }) {
          nodes {
            id
            name
            slug
            description
            count
            uri
          }
        }
      }
    `;

    const data = await this.request<{
      categories: {
        nodes: WPCategory[];
      };
    }>(query, { first });

    if (data?.categories?.nodes?.length) {
      return data.categories.nodes;
    }

    const restCats = await this.restGet<Array<{ id: number; name: string; slug: string; description: string; count: number }>>(`categories?per_page=${first}&hide_empty=true`);
    if (restCats && restCats.length > 0) {
      return restCats.map((c) => ({
        id: String(c.id),
        name: c.name,
        slug: c.slug,
        description: c.description,
        count: c.count,
      }));
    }

    return [];
  }

  async getCategoryBySlug(slug: string, first = 10, after?: string) {
    const query = gql`
      query GetCategoryBySlug($id: ID!, $idType: CategoryIdType!, $first: Int, $after: String) {
        category(id: $id, idType: $idType) {
          id
          name
          slug
          description
          count
          uri
          posts(first: $first, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              id
              title
              slug
              excerpt
              date
              modified
              featuredImage {
                node {
                  id
                  sourceUrl
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              categories {
                nodes {
                  id
                  name
                  slug
                }
              }
              tags {
                nodes {
                  id
                  name
                  slug
                }
              }
              author {
                node {
                  id
                  name
                  slug
                  description
                  avatar {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `;

    const data = await this.request<{
      category: WPCategory & {
        posts: {
          nodes: WPPost[];
          pageInfo: { hasNextPage: boolean; endCursor: string | null };
        };
      };
    }>(query, { id: slug, idType: 'SLUG', first, after });

    return data?.category || null;
  }

  async getTags(first = 100) {
    const query = gql`
      query GetTags($first: Int!) {
        tags(first: $first, where: { hideEmpty: true }) {
          nodes {
            id
            name
            slug
            description
            count
            uri
          }
        }
      }
    `;

    const data = await this.request<{
      tags: {
        nodes: WPTag[];
      };
    }>(query, { first });

    return data?.tags?.nodes || [];
  }

  async getTagBySlug(slug: string, first = 10, after?: string) {
    const query = gql`
      query GetTagBySlug($id: ID!, $idType: TagIdType!, $first: Int, $after: String) {
        tag(id: $id, idType: $idType) {
          id
          name
          slug
          description
          count
          uri
          posts(first: $first, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              id
              title
              slug
              excerpt
              date
              modified
              featuredImage {
                node {
                  id
                  sourceUrl
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              categories {
                nodes {
                  id
                  name
                  slug
                }
              }
              tags {
                nodes {
                  id
                  name
                  slug
                }
              }
              author {
                node {
                  id
                  name
                  slug
                  description
                  avatar {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `;

    const data = await this.request<{
      tag: WPTag & {
        posts: {
          nodes: WPPost[];
          pageInfo: { hasNextPage: boolean; endCursor: string | null };
        };
      };
    }>(query, { id: slug, idType: 'SLUG', first, after });

    return data?.tag || null;
  }

  async getAuthors(first = 100) {
    const query = gql`
      query GetAuthors($first: Int!) {
        users(first: $first) {
          nodes {
            id
            name
            slug
            description
            avatar {
              url
            }
            url
            posts {
              nodes {
                id
              }
            }
          }
        }
      }
    `;

    const data = await this.request<{
      users: {
        nodes: WPAuthor[];
      };
    }>(query, { first });

    return data?.users?.nodes || [];
  }

  async getAuthorBySlug(slug: string, first = 10, after?: string) {
    const query = gql`
      query GetAuthorBySlug($id: ID!, $idType: UserIdType!, $first: Int, $after: String) {
        user(id: $id, idType: $idType) {
          id
          name
          slug
          description
          avatar {
            url
          }
          url
          posts(first: $first, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              id
              title
              slug
              excerpt
              date
              modified
              featuredImage {
                node {
                  id
                  sourceUrl
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              categories {
                nodes {
                  id
                  name
                  slug
                }
              }
              tags {
                nodes {
                  id
                  name
                  slug
                }
              }
              author {
                node {
                  id
                  name
                  slug
                  description
                  avatar {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `;

    const data = await this.request<{
      user: WPAuthor & {
        posts: {
          nodes: WPPost[];
          pageInfo: { hasNextPage: boolean; endCursor: string | null };
        };
      };
    }>(query, { id: slug, idType: 'SLUG', first, after });

    return data?.user || null;
  }

  async getMenu(location: string) {
    const query = gql`
      query GetMenu($location: MenuLocationEnum!) {
        menuItems(where: { location: $location }) {
          nodes {
            id
            label
            url
            parentId
            children {
              nodes {
                id
                label
                url
                parentId
              }
            }
          }
        }
      }
    `;

    const data = await this.request<{
      menuItems: {
        nodes: Array<{
          id: string;
          label: string;
          url: string;
          parentId: string | null;
          children?: {
            nodes: Array<{
              id: string;
              label: string;
              url: string;
              parentId: string;
            }>;
          };
        }>;
      };
    }>(query, { location });

    return data?.menuItems?.nodes || [];
  }

  async getSiteInfo() {
    const query = gql`
      query GetSiteInfo {
        generalSettings {
          title
          description
          url
          language
        }
        readingSettings {
          postsPerPage
        }
      }
    `;

    const data = await this.request<{
      generalSettings: {
        title: string;
        description: string;
        url: string;
        language: string;
      };
      readingSettings: {
        postsPerPage: number;
      };
    }>(query);

    return data;
  }

  async getSitemapPosts() {
    const query = gql`
      query GetSitemapPosts {
        posts(first: 5000) {
          nodes {
            slug
            modified
            uri
          }
        }
      }
    `;

    const data = await this.request<{
      posts: {
        nodes: Array<{ slug: string; modified: string; uri: string }>;
      };
    }>(query);

    return data.posts.nodes;
  }

  async getRSSPosts(first = 50) {
    const query = gql`
      query GetRSSPosts($first: Int!) {
        posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            id
            title
            slug
            uri
            excerpt
            content
            date
            modified
            featuredImage {
              node {
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
            author {
              node {
                name
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
          }
        }
      }
    `;

    const data = await this.request<{
      posts: { nodes: WPPost[] };
    }>(query, { first });

    return data.posts.nodes;
  }

  async getMenuItems() {
    try {
      const cats = await this.getCategories(50);
      const items = [
        { label: 'Início', href: '/' },
        ...cats.map((c) => ({ label: c.name, href: `/categoria/${c.slug}` })),
      ];
      return items;
    } catch (e) {
      console.error('[WPGraphQL] Failed to build menu:', e);
      return [];
    }
  }
}

export const wpClient = new WPGraphQLClient();