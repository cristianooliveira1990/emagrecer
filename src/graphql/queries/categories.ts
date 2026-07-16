import { gql } from 'graphql-request';

export const GET_CATEGORIES = gql`
  query GetCategories($first: Int, $after: String) {
    categories(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
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

export const GET_CATEGORY_BY_SLUG = gql`
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
          readingTime
        }
      }
    }
  }
`;