import { useCreateNewContactMutation } from '@app/graphql/mutations/contacts.generated';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

const validationSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  phoneNumber: string()
    .required('This field is required')
    .matches(/\d{10}/),
  email: string().email(),
});

type ContactForm = typeof validationSchema.__outputType;

export default function AddContactView() {
  const { mutate: createContact } = useCreateNewContactMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<ContactForm>({
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
            'text-red-600': touchedFields.firstName && errors.firstName,
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
              'border-red-600': touchedFields.firstName && errors.firstName,
            })}
            {...register('firstName')}
          />
        </div>
        <div
          className={clsx('mb-5 flex flex-col ml-2', {
            'text-red-600': touchedFields.lastName && errors.lastName,
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
              'border-red-600': touchedFields.lastName && errors.lastName,
            })}
            {...register('lastName')}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <div
          className={clsx('mb-5 flex flex-col mr-2', {
            'text-red-600': touchedFields.phoneNumber && errors.phoneNumber,
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
              'border-red-600': touchedFields.phoneNumber && errors.phoneNumber,
            })}
            {...register('phoneNumber')}
          />
        </div>
        <div
          className={clsx('mb-5 flex flex-col ml-2', {
            'text-red-600': touchedFields.email && errors.email,
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
              'border-red-600': touchedFields.email && errors.email,
            })}
            {...register('email')}
          />
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
