import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { apiUrl } from './constants';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export const httpClient = axios.create({
  baseURL: apiUrl,
});
