import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddContactView from './views/AddContactView';
import ContactsView from './views/ContactsView';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex flex-col h-screen bg-gray-200 p-6">
        <Router>
          <Routes>
            <Route path="/" element={<ContactsView />} />
            <Route path="/add" element={<AddContactView />} />
          </Routes>
        </Router>
      </main>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
