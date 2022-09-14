import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AddContactView from './views/AddContactView';
import ContactsView from './views/ContactsView';
import UpdateContactView from './views/UpdateContactView';

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<ContactsView />} />
          <Route path="/add" element={<AddContactView />} />
          <Route path="/edit/:id" element={<UpdateContactView />} />
        </Routes>
      </Router>

      <ReactQueryDevtools />
    </main>
  );
}

export default App;
