export interface WPImage {
  id: string;
  sourceUrl: string;
  altText: string | null;
  width?: number;
  height?: number;
  mediaDetails?: {
    width: number;
    height: number;
    file: string;
    sizes?: Array<{
      sourceUrl: string;
      width: number;
      height: number;
      mimeType: string;
    }>;
  };
}

export interface WPAuthor {
  id: string;
  databaseId?: number;
  name: string;
  slug: string;
  description: string;
  avatar: {
    url: string;
    width: number;
    height: number;
  } | null;
  url: string;
  posts?: {
    nodes: Array<{ id: string }>;
  };
}

export interface WPCategory {
  id: string;
  databaseId?: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  uri: string;
}

export interface WPTag {
  id: string;
  databaseId?: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  uri: string;
}

export interface WPPost {
  id: string;
  databaseId?: number;
  title: string;
  slug: string;
  uri: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  featuredImage: {
    node: WPImage | null;
  };
  author: {
    node: WPAuthor;
  };
  categories: {
    nodes: WPCategory[];
  };
  tags: {
    nodes: WPTag[];
  };
  seo?: {
    title: string | null;
    metaDesc: string | null;
    canonical: string | null;
    opengraphTitle: string | null;
    opengraphDescription: string | null;
    opengraphImage: {
      sourceUrl: string;
      altText: string | null;
    } | null;
    twitterTitle: string | null;
    twitterDescription: string | null;
    twitterImage: {
      sourceUrl: string;
      altText: string | null;
    } | null;
    metaRobotsNoindex: boolean | null;
    metaRobotsNofollow: boolean | null;
  };
  readingTime?: number;
}

export interface WPPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface WPPostsResponse {
  nodes: WPPost[];
  pageInfo: WPPageInfo;
}

export interface WPCategoryWithPosts extends WPCategory {
  posts: {
    nodes: WPPost[];
    pageInfo: WPPageInfo;
  };
}

export interface WPTagWithPosts extends WPTag {
  posts: {
    nodes: WPPost[];
    pageInfo: WPPageInfo;
  };
}

export interface WPAuthorWithPosts extends WPAuthor {
  posts: {
    nodes: WPPost[];
    pageInfo: WPPageInfo;
  };
}

export interface WPMenuItem {
  id: string;
  label: string;
  url: string;
  parentId: string | null;
  children?: {
    nodes: WPMenuItem[];
  };
}

export interface WPSiteInfo {
  generalSettings: {
    title: string;
    description: string;
    url: string;
    language: string;
  };
  readingSettings: {
    postsPerPage: number;
  };
}