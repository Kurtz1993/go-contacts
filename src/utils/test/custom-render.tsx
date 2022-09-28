import { QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FC, ReactElement, ReactNode } from 'react';

import { queryClient } from '@app/config/queryClient';

type CustomRenderOptions = {};

const customRender = (component: ReactElement, options: Partial<CustomRenderOptions> = {}) => {
  const Wrapper: FC<{ children: ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return { user: userEvent.setup(), ...render(component, { wrapper: Wrapper }) };
};

export { customRender as render };
