import { gql } from 'graphql-request';
import type { WPPost, WPCategory, WPTag, WPAuthor, WPPageInfo } from '../types/wordpress';

const WPGRAPHQL_URL = import.meta.env.PUBLIC_WPGRAPHQL_URL || import.meta.env.WPGRAPHQL_URL || 'https://cms.emagrecer.xx.kg/graphql';

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

class WPGraphQLClient {
  private url: string;

  constructor() {
    this.url = WPGRAPHQL_URL;
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

    return data.posts;
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

    return data.post;
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

    return data.categories.nodes;
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

    return data.category;
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

    return data.tags.nodes;
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

    return data.tag;
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

    return data.users.nodes;
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

    return data.user;
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

    return data.menuItems.nodes;
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
}

export const wpClient = new WPGraphQLClient();