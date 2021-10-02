import ContactCard from "@components/ContactCard";
import { AsyncData, AsyncStatus } from "@models/async-data.model";
import { Contact } from "@models/contact.model";
import { getContacts } from "@services/contactsApi";
import { useEffect, useState } from "react";

export default function ContactsView() {
  const [contacts, setContacts] = useState<AsyncData<Contact[]>>({
    status: AsyncStatus.Idle,
    data: [],
  });

  useEffect(() => {
    if (contacts.status === AsyncStatus.Idle) {
      getContacts()
        .then((data) => {
          setContacts({ status: AsyncStatus.Fulfilled, data });
        })
        .catch((err) => console.log(err));
    }
  }, [contacts.status]);

  return (
    <div>
      <h1 className="text-center text-5xl mb-10">Contacts Book</h1>
      <div className="flex flex-wrap justify-center">
        {contacts.data.map((item) => (
          <ContactCard contact={item} />
        ))}
      </div>
    </div>
  );
}
