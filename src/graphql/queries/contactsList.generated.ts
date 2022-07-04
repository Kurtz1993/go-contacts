import * as Types from '../../gen/graphql';

import { api } from '@app/api/baseApi';
export type ContactsListQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ContactsListQuery = {
  __typename?: 'Query';
  contacts: Array<{ __typename?: 'Contact'; firstName: string; lastName: string }>;
};

export const ContactsListDocument = `
    query contactsList {
  contacts {
    firstName
    lastName
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    contactsList: build.query<ContactsListQuery, ContactsListQueryVariables | void>({
      query: variables => ({ document: ContactsListDocument, variables }),
    }),
  }),
});

export { injectedRtkApi as api };
export const { useContactsListQuery, useLazyContactsListQuery } = injectedRtkApi;
