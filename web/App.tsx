import { Container } from '@mui/material';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AddContactView from './views/AddContactView';
import ContactsView from './views/ContactsView';
import UpdateContactView from './views/UpdateContactView';

function App() {
  return (
    <Container component="main">
      <Router>
        <Routes>
          <Route path="/" element={<ContactsView />} />
          <Route path="/add" element={<AddContactView />} />
          <Route path="/edit/:id" element={<UpdateContactView />} />
        </Routes>
      </Router>

      <ReactQueryDevtools />
    </Container>
  );
}

export default App;
