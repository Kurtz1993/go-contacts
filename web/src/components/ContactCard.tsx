import { Delete, Edit, Phone } from '@mui/icons-material';
import Mail from '@mui/icons-material/Mail';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';

import DetailItem from './DetailItem';

import { queryClient } from '@app/config/queryClient';
import { Contact } from '@app/models';
import { useDeleteContactMutation } from '@app/queries/contacts.queries';

type ContactCardProps = {
  contact: Contact;
};

export default function ContactCard({ contact }: ContactCardProps) {
  const { mutateAsync } = useDeleteContactMutation();

  async function deleteContact() {
    await mutateAsync(
      { contactId: contact.id },
      {
        onSuccess() {
          queryClient.invalidateQueries(['contactsList']);
        },
      }
    );
  }

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={`${contact.avatarUrl}?s=256`} />}
        title={`${contact.firstName} ${contact.lastName}`}
      />

      <CardContent>
        <DetailItem icon={<Mail />} text={contact.email} />
        <DetailItem icon={<Phone />} text={contact.phoneNumber} />
      </CardContent>

      <CardActions>
        <Button startIcon={<Edit />} component={Link} to={`/edit/${contact.id}`}>
          Editar
        </Button>
        <Button startIcon={<Delete />} type="button" onClick={deleteContact} color="error">
          Eliminar
        </Button>
      </CardActions>
    </Card>
  );
}
