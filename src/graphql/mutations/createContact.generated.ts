import * as Types from '../../gen/graphql';

import { useMutation, UseMutationOptions } from 'react-query';

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:8080/graphql", {
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
export const useCreateNewContactMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateNewContactMutation, TError, CreateNewContactMutationVariables, TContext>) =>
    useMutation<CreateNewContactMutation, TError, CreateNewContactMutationVariables, TContext>(
      ['createNewContact'],
      (variables?: CreateNewContactMutationVariables) => fetcher<CreateNewContactMutation, CreateNewContactMutationVariables>(CreateNewContactDocument, variables)(),
      options
    );