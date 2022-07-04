import ContactCard from '@app/components/ContactCard';
import { useContactsListQuery } from '@app/graphql/queries/contactsList.generated';
import { Link } from 'react-router-dom';

export default function ContactsView() {
  const { isFetching, data: data } = useContactsListQuery();

  return (
    <div>
      <h1 className="text-center text-5xl mb-10">Contacts Book</h1>
      <div className="flex justify-end">
        <Link to="/add" className="bg-teal-700 text-white hover:bg-teal-800 rounded py-2 px-4 transition-colors">
          Add Contact
        </Link>
      </div>
      <div className="flex flex-wrap justify-center">
        {data?.contacts?.map(item => (
          <ContactCard contact={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
