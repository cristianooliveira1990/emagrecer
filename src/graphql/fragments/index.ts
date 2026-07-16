export const POST_FRAGMENT = `
  fragment PostFields on Post {
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
        width
        height
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
    seo {
      title
      metaDesc
      canonical
      opengraphTitle
      opengraphDescription
      opengraphImage {
        sourceUrl
        altText
      }
      twitterTitle
      twitterDescription
      twitterImage {
        sourceUrl
        altText
      }
      metaRobotsNoindex
      metaRobotsNofollow
    }
    readingTime
    customFields {
      readingTime
      featuredVideo
      audioUrl
      relatedPosts
      faq {
        question
        answer
      }
      tableOfContents {
        id
        text
        level
      }
    }
  }
`;

export const CATEGORY_FRAGMENT = `
  fragment CategoryFields on Category {
    id
    name
    slug
    description
    count
    uri
  }
`;

export const TAG_FRAGMENT = `
  fragment TagFields on Tag {
    id
    name
    slug
    description
    count
    uri
  }
`;

export const AUTHOR_FRAGMENT = `
  fragment AuthorFields on User {
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
`;

export const IMAGE_FRAGMENT = `
  fragment ImageFields on MediaItem {
    sourceUrl
    altText
    width
    height
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
`;

export const SEO_FRAGMENT = `
  fragment SEOFields on PostSEO {
    title
    metaDesc
    canonical
    opengraphTitle
    opengraphDescription
    opengraphImage {
      sourceUrl
      altText
    }
    twitterTitle
    twitterDescription
    twitterImage {
      sourceUrl
      altText
    }
    metaRobotsNoindex
    metaRobotsNofollow
  }
`;