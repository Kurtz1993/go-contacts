import { useMutation, useQuery } from '@tanstack/react-query';

import { httpClient, queryClient } from '@app/config/queryClient';
import { Contact } from '@app/models';

export function useContactsListQuery() {
  return useQuery<Contact[]>(['contactsList'], {
    async queryFn() {
      const { data } = await httpClient.get<Contact[]>('/contacts');

      return data;
    },
  });
}

export function useCreateNewContactMutation() {
  return useMutation(['createContact'], {
    async mutationFn({
      contact,
    }: {
      contact: { firstName: string; lastName: string; phoneNumber?: string; email?: string };
    }) {
      const { data } = await httpClient.post<Contact>('/contacts', contact);

      return data;
    },
    onSuccess() {
      queryClient.invalidateQueries(['contactsList']);
    },
  });
}

export function useDeleteContactMutation() {
  return useMutation(['deleteContact'], {
    async mutationFn({ contactId }: { contactId: number }) {
      await httpClient.delete<void>(`/contacts/${contactId}`);
    },
    onSuccess() {
      queryClient.invalidateQueries(['contactsList']);
    },
  });
}

export function useUpdateContactMutation() {
  return useMutation(['updateContact'], {
    async mutationFn({ contact }: { contact: Contact }) {
      const { data } = await httpClient.put<Contact>('/contacts', contact);

      return data;
    },
    onSuccess() {
      queryClient.invalidateQueries(['contactsList']);
    },
  });
}
