import { IonApp } from '@ionic/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AddContactView from './views/AddContactView';
import ContactsView from './views/ContactsView';
import UpdateContactView from './views/UpdateContactView';

function App() {
  return (
    <IonApp>
      <Router>
        <Routes>
          <Route path="/" element={<ContactsView />} />
          <Route path="/add" element={<AddContactView />} />
          <Route path="/edit/:id" element={<UpdateContactView />} />
        </Routes>
      </Router>

      <ReactQueryDevtools />
    </IonApp>
  );
}

export default App;
