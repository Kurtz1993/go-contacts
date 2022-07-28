import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { queryClient } from './config/queryClient';
import AddContactView from './views/AddContactView';
import ContactsView from './views/ContactsView';
import UpdateContactView from './views/UpdateContactView';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex flex-col h-screen bg-gray-200 p-6">
        <Router>
          <Routes>
            <Route path="/" element={<ContactsView />} />
            <Route path="/add" element={<AddContactView />} />
            <Route path="/edit/:id" element={<UpdateContactView />} />
          </Routes>
        </Router>
      </main>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
