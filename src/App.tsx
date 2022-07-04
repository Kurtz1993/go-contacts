import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import AddContactView from './views/AddContactView';
import ContactsView from './views/ContactsView';

function App() {
  return (
    <Provider store={store}>
      <main className="flex flex-col h-screen bg-gray-200 p-6">
        <Router>
          <Routes>
            <Route path="/" element={<ContactsView />} />
            <Route path="/add" element={<AddContactView />} />
          </Routes>
        </Router>
      </main>
    </Provider>
  );
}

export default App;
