import { Field, Form, Formik } from "formik";
import i18next from "i18next";
import * as yup from "yup";

const thirdValidationSchema = yup.object().shape({
  wallet_address: yup.string().required("wallet address is required"),
});

interface props {
  prev: () => void;
  submit: (values: any) => void;
  values: any;
  loading: boolean;
  error: string;
  isDisabled: boolean;
}

const Third: React.FC<props> = ({ prev, submit, values, loading, error, isDisabled }) => {

  const { t } = i18next;
  const prevText = t('general.prev');

  const submitText = t('general.submit');

  return (
    <div className="">
      <Formik
        enableReinitialize={true}
        initialValues={{
          ...values,
        }}
        validationSchema={thirdValidationSchema}
        onSubmit={(values) => {
          submit(values);
        }}
      >
        {() => (
          <Form>
            {[
              {
                label: "Wallet address",
                name: "wallet_address",
                placeholder: t('thirdform.address.placeholder'),
                required: "true",
                type: "text",
              },
            ].map((item, index) => (
              <div key={index} className="my-4">
                <label htmlFor={item.name} className="block text-sm">
                  {item.label}
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

            {error && (
              <p className="bg-red-50 text-center w-full rounded-lg p-3 border border-red-600 text-red-600">
                {error}
              </p>
            )}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => prev()}
                className="
                      px-6
                      py-2
                      mt-4
                      text-sm
                      font-medium
                      leading-5
                      text-center text-primary
                      transition-colors
                      duration-150
                      bg-white
                      border border-primary
                      rounded-lg
                      focus:outline-none
                    "
              >
                {prevText}
              </button>
              <button
                type="submit"
                disabled={loading || isDisabled}
                className={`
                      px-6
                      py-2
                      mt-4
                      text-sm
                      font-medium
                      leading-5
                      text-center text-white
                      transition-colors
                      duration-150
                      bg-primary
                      border border-transparent
                      rounded-lg
                      hover:bg-blue-700
                      focus:outline-none
                      ${loading && "opacity-75"}
                    `}
              >
                {loading ? "Loading..." : submitText}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Third;
