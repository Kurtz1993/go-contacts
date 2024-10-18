import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { object, string } from 'yup';

import { useCreateNewContactMutation } from '@app/queries/contacts.queries';

const validationSchema = object({
  firstName: string().required('This field is required.'),
  lastName: string().required('This field is required.'),
  phoneNumber: string()
    .required('This field is required.')
    .matches(/\d{10}/, { message: 'Phone number must be 10 digits.' }),
  email: string().email('Must be a valid e-mail.'),
});

type ContactForm = typeof validationSchema.__outputType;

export default function AddContactView() {
  const navigate = useNavigate();
  const { mutateAsync: createContact } = useCreateNewContactMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  function submitContact(values: ContactForm) {
    createContact({ contact: values }).then(() => {
      navigate('/');
    });
  }

  return (
    <form className="flex flex-col items-center" onSubmit={handleSubmit(submitContact)} noValidate>
      <div className="flex justify-between">
        <div
          className={clsx('mb-5 flex flex-col mr-2', {
            'text-red-600': errors.firstName,
          })}
        >
          <TextField
            label="First Name"
            type="text"
            name="firstName"
            id="firstName"
            className={clsx('rounded', {
              'border-red-600': errors.firstName,
            })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            {...register('firstName')}
          />
        </div>
        <div
          className={clsx('mb-5 flex flex-col ml-2', {
            'text-red-600': errors.lastName,
          })}
        >
          <TextField
            label="Last Name"
            type="text"
            name="lastName"
            id="lastName"
            className={clsx('rounded', {
              'border-red-600': errors.lastName,
            })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            {...register('lastName')}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <div
          className={clsx('mb-5 flex flex-col mr-2', {
            'text-red-600': errors.phoneNumber,
          })}
        >
          <TextField
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            className={clsx('rounded', {
              'border-red-600': errors.phoneNumber,
            })}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            {...register('phoneNumber')}
          />
        </div>
        <div
          className={clsx('mb-5 flex flex-col ml-2', {
            'text-red-600': errors.email,
          })}
        >
          <TextField
            label="Email"
            type="email"
            name="email"
            id="email"
            className={clsx('rounded', {
              'border-red-600': errors.email,
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
          />
        </div>
      </div>

      <div>
        <Button
          variant="contained"
          type="submit"
          className="py-2 px-4 bg-teal-700 text-white rounded hover:bg-teal-800 transition-colors"
        >
          Add Contact
        </Button>
      </div>
    </form>
  );
}
