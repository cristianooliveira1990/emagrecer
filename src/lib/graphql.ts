import { GraphQLClient, gql } from 'graphql-request';
import type { GraphQLClient as GraphQLClientType } from 'graphql-request';

let client: GraphQLClientType | null = null;

export function getGraphQLClient(): GraphQLClientType {
  if (!client) {
    const endpoint = import.meta.env.WPGRAPHQL_URL || 'https://emagrecer.xx.kg/wp/graphql';
    client = new GraphQLClient(endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  return client;
}

export async function graphqlRequest<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const client = getGraphQLClient();
  try {
    const data = await client.request<T>(gql`${query}`, variables);
    return data;
  } catch (error) {
    console.error('GraphQL Request Error:', error);
    throw error;
  }
}

export async function graphqlRequestWithErrors<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<{ data?: T; errors?: Array<{ message: string }> }> {
  const client = getGraphQLClient();
  try {
    const response = await client.rawRequest(query, variables);
    return response as { data?: T; errors?: Array<{ message: string }> };
  } catch (error) {
    console.error('GraphQL Raw Request Error:', error);
    throw error;
  }
}