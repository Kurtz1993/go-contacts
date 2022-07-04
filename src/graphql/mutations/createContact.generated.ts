import * as Types from '../../gen/graphql';

import { api } from '@app/api/baseApi';
export type CreateNewContactMutationVariables = Types.Exact<{
  contact: Types.NewContact;
}>;


export type CreateNewContactMutation = { __typename?: 'Mutation', createContact: { __typename?: 'Contact', firstName: string, lastName: string, phoneNumber?: string | null, email?: string | null } };


export const CreateNewContactDocument = `
    mutation createNewContact($contact: NewContact!) {
  createContact(input: $contact) {
    firstName
    lastName
    phoneNumber
    email
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    createNewContact: build.mutation<CreateNewContactMutation, CreateNewContactMutationVariables>({
      query: (variables) => ({ document: CreateNewContactDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreateNewContactMutation } = injectedRtkApi;

