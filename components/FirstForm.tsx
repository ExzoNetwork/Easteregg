import { Field, Form, Formik } from "formik";
import i18next from "i18next";
import * as yup from "yup";
import countries from "../util/countries";

const firstValidationSchema = yup.object().shape({
  full_name: yup.string().required("Full name is required"),
  email: yup.string().email().required("Email is required"),
  telegram_username: yup.string().required("Telegram username is required"),
  twitter_username: yup.string(),
  country: yup.string().required("Country is required"),
});

interface props {
  next: () => void;
  submit: (values: any) => void;
  values: any;
  isDisabled: boolean;
}

const First: React.FC<props> = ({ next, submit, values, isDisabled }) => {
  const { t } = i18next;

  const nextText = t('general.next');

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        ...values,
      }}
      validationSchema={firstValidationSchema}
      onSubmit={(values) => {
        submit(values);
        next();
      }}
    >
      {() => (
        <Form>
          {[
            {
              label: "Full name",
              name: "full_name",
              placeholder: "Full name",
              required: true,
              type: "text",
            },
            {
              label: "Email",
              name: "email",
              placeholder: "email address",
              required: true,
              type: "email",
            },
            {
              label: "Telegram username",
              name: "telegram_username",
              placeholder: "enter your telegram username",
              required: true,
              type: "text",
            },
            {
              label: "Twitter username",
              name: "twitter_username",
              placeholder: "enter your twitter username",
              required: false,
              type: "text",
            },
          ].map((item, index) => (
            <div key={index} className="my-4">
              <label htmlFor={item.name} className="block text-sm">
                {item.label} {item.required && '*'}
              </label>
              <Field
                type={item.type}
                name={item.name}
                id={item.name}
                required={item.required}
                disabled={isDisabled}
                className="
                      w-full
                      px-4
                      py-2
                      text-sm
                      border
                      rounded-md
                      focus:border-blue-400
                      focus:outline-none
                      focus:ring-1
                      focus:ring-primary
                    "
                placeholder={item.placeholder}
              />
            </div>
          ))}
          <div className="my-4">
            <label htmlFor="country" className="block text-sm">
              Country *
            </label>
            <Field
              as="select"
              name="country"
              id="country"
              disabled={isDisabled}
              required={true}
              className="
                      w-full
                      px-4
                      py-2
                      text-sm
                      border
                      rounded-md
                      focus:border-blue-400
                      focus:outline-none
                      focus:ring-1
                      focus:ring-primary
                    "
            >
              <option disabled value="">
                select your country
              </option>
              {countries.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Field>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isDisabled}
              className="
                      px-6
                      py-2
                      mt-4
                      text-sm
                      font-medium
                      leading-5
                      text-center text-white
                      transition-colors
                      duration-150
                      bg-warn
                      border border-transparent
                      rounded-lg
                      hover:bg-blue-700
                      focus:outline-none
                    "
            >
              {nextText}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default First;
