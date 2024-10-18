import { Button, Grid2 } from '@mui/material';
import { Link } from 'react-router-dom';

import ContactCard from '@app/components/ContactCard';
import { useContactsListQuery } from '@app/queries/contacts.queries';

export default function ContactsView() {
  const { data } = useContactsListQuery();

  return (
    <div>
      <h1 className="text-center text-5xl mb-10">Contacts Book</h1>
      <div className="flex justify-end">
        <Button
          component={Link}
          variant="text"
          to="/add"
          className="bg-teal-700 text-white hover:bg-teal-800 rounded py-2 px-4 transition-colors"
        >
          Add Contact
        </Button>
      </div>
      <Grid2 spacing={3} container>
        {data?.map(item => (
          <ContactCard contact={item} key={item.id} />
        ))}
      </Grid2>
    </div>
  );
}
