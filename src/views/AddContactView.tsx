import { useCreateNewContactMutation } from '@app/graphql/mutations/createContact.generated';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { object, string } from 'yup';

const validationSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  phoneNumber: string().matches(/\d{10}/),
  email: string().email(),
});

export default function AddContactView() {
  const { mutate: createContact } = useCreateNewContactMutation();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
    },
    validationSchema,
    onSubmit(values) {
      createContact({ contact: values });
    },
  });

  return (
    <form className="flex flex-col items-center" onSubmit={formik.handleSubmit} noValidate>
      <div className="flex justify-between">
        <div
          className={clsx('mb-5 flex flex-col mr-2', {
            'text-red-600': formik.touched.firstName && formik.errors.firstName,
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
              'border-red-600': formik.touched.firstName && formik.errors.firstName,
            })}
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
        </div>
        <div
          className={clsx('mb-5 flex flex-col ml-2', {
            'text-red-600': formik.touched.lastName && formik.errors.lastName,
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
              'border-red-600': formik.touched.lastName && formik.errors.lastName,
            })}
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <div
          className={clsx('mb-5 flex flex-col mr-2', {
            'text-red-600': formik.touched.phoneNumber && formik.errors.phoneNumber,
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
              'border-red-600': formik.touched.phoneNumber && formik.errors.phoneNumber,
            })}
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
          />
        </div>
        <div
          className={clsx('mb-5 flex flex-col ml-2', {
            'text-red-600': formik.touched.email && formik.errors.email,
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
              'border-red-600': formik.touched.email && formik.errors.email,
            })}
            value={formik.values.email}
            onChange={formik.handleChange}
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
