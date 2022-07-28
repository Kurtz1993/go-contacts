import * as Types from '../gen/types.js';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

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
export type CreateNewContactMutationVariables = Types.Exact<{
  contact: Types.ContactInput;
}>;


export type CreateNewContactMutation = { __typename?: 'Mutation', createContact: { __typename?: 'Contact', firstName: string, lastName: string, phoneNumber?: string | null, email?: string | null } };

export type UpdateContactMutationVariables = Types.Exact<{
  contact: Types.ContactInput;
}>;


export type UpdateContactMutation = { __typename?: 'Mutation', updateContact: { __typename?: 'Contact', firstName: string, lastName: string, phoneNumber?: string | null, email?: string | null } };

export type DeleteContactMutationVariables = Types.Exact<{
  contactId: Types.Scalars['Int'];
}>;


export type DeleteContactMutation = { __typename?: 'Mutation', deleteContact?: any | null };


export const CreateNewContactDocument = `
    mutation createNewContact($contact: ContactInput!) {
  createContact(input: $contact) {
    firstName
    lastName
    phoneNumber
    email
  }
}
    `;
export const useCreateNewContactMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateNewContactMutation, TError, CreateNewContactMutationVariables, TContext>) =>
    useMutation<CreateNewContactMutation, TError, CreateNewContactMutationVariables, TContext>(
      ['createNewContact'],
      (variables?: CreateNewContactMutationVariables) => fetcher<CreateNewContactMutation, CreateNewContactMutationVariables>(CreateNewContactDocument, variables)(),
      options
    );
export const UpdateContactDocument = `
    mutation updateContact($contact: ContactInput!) {
  updateContact(input: $contact) {
    firstName
    lastName
    phoneNumber
    email
  }
}
    `;
export const useUpdateContactMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateContactMutation, TError, UpdateContactMutationVariables, TContext>) =>
    useMutation<UpdateContactMutation, TError, UpdateContactMutationVariables, TContext>(
      ['updateContact'],
      (variables?: UpdateContactMutationVariables) => fetcher<UpdateContactMutation, UpdateContactMutationVariables>(UpdateContactDocument, variables)(),
      options
    );
export const DeleteContactDocument = `
    mutation deleteContact($contactId: Int!) {
  deleteContact(contactId: $contactId)
}
    `;
export const useDeleteContactMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteContactMutation, TError, DeleteContactMutationVariables, TContext>) =>
    useMutation<DeleteContactMutation, TError, DeleteContactMutationVariables, TContext>(
      ['deleteContact'],
      (variables?: DeleteContactMutationVariables) => fetcher<DeleteContactMutation, DeleteContactMutationVariables>(DeleteContactDocument, variables)(),
      options
    );