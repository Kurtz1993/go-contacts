import * as Types from '../../gen/graphql';

import { api } from '@app/api/baseApi';
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

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    contactsList: build.query<ContactsListQuery, ContactsListQueryVariables | void>({
      query: (variables) => ({ document: ContactsListDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useContactsListQuery, useLazyContactsListQuery } = injectedRtkApi;

