import * as Types from '../gen/types.js';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:3000/api/graphql", {
    method: "POST",
    ...({"headers":{"Accept":"application/json","Content-Type":"application/json"}}),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
export type ContactsListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ContactsListQuery = { __typename?: 'Query', contacts: Array<{ __typename?: 'Contact', id: number, avatarUrl?: string | null, firstName: string, lastName: string, phoneNumber?: string | null, email?: string | null }> };


export const ContactsListDocument = `
    query contactsList {
  contacts {
    id
    avatarUrl
    firstName
    lastName
    phoneNumber
    email
  }
}
    `;
export const useContactsListQuery = <
      TData = ContactsListQuery,
      TError = unknown
    >(
      variables?: ContactsListQueryVariables,
      options?: UseQueryOptions<ContactsListQuery, TError, TData>
    ) =>
    useQuery<ContactsListQuery, TError, TData>(
      variables === undefined ? ['contactsList'] : ['contactsList', variables],
      fetcher<ContactsListQuery, ContactsListQueryVariables>(ContactsListDocument, variables),
      options
    );