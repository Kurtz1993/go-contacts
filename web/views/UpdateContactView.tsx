import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { object, string } from 'yup';

import { useContactsListQuery, useUpdateContactMutation } from '@app/queries/contacts.queries';

const validationSchema = object({
  firstName: string().required('This field is required.'),
  lastName: string().required('This field is required.'),
  phoneNumber: string()
    .required('This field is required.')
    .matches(/\d{10}/, { message: 'Phone number must be 10 digits.' }),
  email: string().email('Must be a valid e-mail.'),
});

type ContactForm = typeof validationSchema.__outputType;

export default function UpdateContactView() {
  const navigate = useNavigate();
  const { data } = useContactsListQuery();
  const { id } = useParams<{ id: string }>();
  const { mutateAsync: updateContact } = useUpdateContactMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ContactForm>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const selectedContact = data?.find(item => item.id === +id);

    if (selectedContact) {
      setValue('email', selectedContact.email);
      setValue('firstName', selectedContact.firstName);
      setValue('lastName', selectedContact.lastName);
      setValue('phoneNumber', selectedContact.phoneNumber);
    }
  }, [data, id, setValue]);

  function submitContact(values: ContactForm) {
    updateContact({ contact: { ...values, id: +id } }).then(() => {
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
          <label className="mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className={clsx('rounded', {
              'border-red-600': errors.firstName,
            })}
            {...register('firstName')}
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>
        <div
          className={clsx('mb-5 flex flex-col ml-2', {
            'text-red-600': errors.lastName,
          })}
        >
          <label className="mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className={clsx('rounded', {
              'border-red-600': errors.lastName,
            })}
            {...register('lastName')}
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="flex justify-between">
        <div
          className={clsx('mb-5 flex flex-col mr-2', {
            'text-red-600': errors.phoneNumber,
          })}
        >
          <label className="mb-2" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            className={clsx('rounded', {
              'border-red-600': errors.phoneNumber,
            })}
            {...register('phoneNumber')}
          />
          {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
        </div>
        <div
          className={clsx('mb-5 flex flex-col ml-2', {
            'text-red-600': errors.email,
          })}
        >
          <label className="mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={clsx('rounded', {
              'border-red-600': errors.email,
            })}
            {...register('email')}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <button type="submit" className="py-2 px-4 bg-teal-700 text-white rounded hover:bg-teal-800 transition-colors">
          Update Contact
        </button>
      </div>
    </form>
  );
}
