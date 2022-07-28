import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

import { useCreateNewContactMutation } from '@app/graphql/mutations/contacts.generated';

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
  const { mutate: createContact } = useCreateNewContactMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  function submitContact(values: ContactForm) {
    createContact({ contact: values });
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
          Add Contact
        </button>
      </div>
    </form>
  );
}
