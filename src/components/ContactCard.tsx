import { ReactComponent as PhoneIcon } from '@app/icons/call-outline.svg';
import { ReactComponent as MailIcon } from '@app/icons/mail-outline.svg';
import { ReactComponent as PencilIcon } from '@app/icons/pencil-outline.svg';
import { Contact } from '@app/models/contact.model';
import DetailItem from './DetailItem';

type ContactCardProps = {
  contact: Contact;
};

export default function ContactCard({ contact }: ContactCardProps) {
  return (
    <figure className="bg-gray-100 rounded-xl p-5 mx-4 my-5 shadow-md hover:shadow-xl hover:scale-50 transition duration-300 flex flex-col">
      <div className="text-right">
        <button type="button">
          <PencilIcon width="20" />
        </button>
      </div>
      <img
        className="w-32 h-32 rounded-full mx-auto"
        src={`${contact.avatarUrl}?s=256`}
        alt=""
        width="384"
        height="512"
      />
      <div className="pt-6 text-center space-y-4">
        <figcaption className="font-medium">
          <div className="text-cyan-600">{`${contact.firstName} ${contact.lastName}`}</div>
          <DetailItem icon={<MailIcon />} text={contact.email} />
          <DetailItem icon={<PhoneIcon />} text={contact.phoneNumber} />
        </figcaption>
      </div>
    </figure>
  );
}
