import { POST_FRAGMENT, CATEGORY_FRAGMENT, TAG_FRAGMENT, AUTHOR_FRAGMENT, IMAGE_FRAGMENT, SEO_FRAGMENT } from '../fragments';

export const GET_POSTS = `
  query GetPosts($first: Int!, $after: String, $where: PostObjectsConnectionWhereArgs) {
    posts(first: $first, after: $after, where: $where) {
      nodes {
        ...PostFields
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
  ${POST_FRAGMENT}
`;

export const GET_POST_BY_SLUG = `
  query GetPostBySlug($id: ID!, $idType: PostIdType!) {
    post(id: $id, idType: $idType) {
      ...PostFields
    }
  }
  ${POST_FRAGMENT}
`;

export const GET_RELATED_POSTS = `
  query GetRelatedPosts($categoryIds: [ID!], $excludeId: ID!, $first: Int!) {
    posts(first: $first, where: { categoryIn: $categoryIds, notIn: [$excludeId] }) {
      nodes {
        ...PostFields
      }
    }
  }
  ${POST_FRAGMENT}
`;

export const GET_CATEGORIES = `
  query GetCategories($first: Int!) {
    categories(first: $first, where: { hideEmpty: true }) {
      nodes {
        ...CategoryFields
      }
    }
  }
  ${CATEGORY_FRAGMENT}
`;

export const GET_CATEGORY_BY_SLUG = `
  query GetCategoryBySlug($id: ID!, $idType: CategoryIdType!) {
    category(id: $id, idType: $idType) {
      ...CategoryFields
    }
  }
  ${CATEGORY_FRAGMENT}
`;

export const GET_CATEGORY_POSTS = `
  query GetCategoryPosts($id: ID!, $idType: CategoryIdType!, $first: Int!, $after: String) {
    category(id: $id, idType: $idType) {
      ...CategoryFields
      posts(first: $first, after: $after) {
        nodes {
          ...PostFields
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
  ${POST_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

export const GET_TAGS = `
  query GetTags($first: Int!) {
    tags(first: $first, where: { hideEmpty: true }) {
      nodes {
        ...TagFields
      }
    }
  }
  ${TAG_FRAGMENT}
`;

export const GET_TAG_BY_SLUG = `
  query GetTagBySlug($id: ID!, $idType: TagIdType!) {
    tag(id: $id, idType: $idType) {
      ...TagFields
    }
  }
  ${TAG_FRAGMENT}
`;

export const GET_TAG_POSTS = `
  query GetTagPosts($id: ID!, $idType: TagIdType!, $first: Int!, $after: String) {
    tag(id: $id, idType: $idType) {
      ...TagFields
      posts(first: $first, after: $after) {
        nodes {
          ...PostFields
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
  ${POST_FRAGMENT}
  ${TAG_FRAGMENT}
`;

export const GET_AUTHORS = `
  query GetAuthors($first: Int!) {
    users(first: $first, where: { who: AUTHORS }) {
      nodes {
        ...AuthorFields
      }
    }
  }
  ${AUTHOR_FRAGMENT}
`;

export const GET_AUTHOR_BY_SLUG = `
  query GetAuthorBySlug($id: ID!, $idType: UserIdType!) {
    user(id: $id, idType: $idType) {
      ...AuthorFields
    }
  }
  ${AUTHOR_FRAGMENT}
`;

export const GET_AUTHOR_POSTS = `
  query GetAuthorPosts($id: ID!, $idType: UserIdType!, $first: Int!, $after: String) {
    user(id: $id, idType: $idType) {
      ...AuthorFields
      posts(first: $first, after: $after) {
        nodes {
          ...PostFields
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
  ${POST_FRAGMENT}
  ${AUTHOR_FRAGMENT}
`;

export const GET_MENU = `
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

export const GET_SITE_INFO = `
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

export const GET_SITEMAP_POSTS = `
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

export const GET_RSS_POSTS = `
  query GetRSSPosts($first: Int!) {
    posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        ...PostFields
      }
    }
  }
  ${POST_FRAGMENT}
`;

export const SEARCH_POSTS = `
  query SearchPosts($search: String!, $first: Int!) {
    posts(first: $first, where: { search: $search, orderby: { field: RELEVANCE, order: DESC } }) {
      nodes {
        id
        title
        slug
        uri
        excerpt
        date
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