import PropTypes from "prop-types";
import { ErrorMessage, Field } from "formik";
import { FiChevronDown } from "react-icons/fi";

export function FormField({
  forName,
  label,
  as,
  options,
  labelClass,
  typeField,
  fieldClass,
  errorClass,
}) {
  return (
    <>
      <label className={labelClass} htmlFor={forName}>
        {label !== "" ? `${label}:` : " "}
      </label>
      <div className="relative">
        <Field
          className={fieldClass}
          as={as !== "" ? as : ""}
          type={typeField}
          id={forName}
          name={forName}
        >
          {as === "select"
            ? options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))
            : null}
        </Field>
        {as === "select" && (
          <div className="relative">
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-8 text-black pointer-events-none" />
          </div>
        )}
      </div>
      <ErrorMessage className={errorClass} name={forName} component="div" />
    </>
  );
}

FormField.propTypes = {
  forName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  as: PropTypes.string,
  options: PropTypes.array,
  labelClass: PropTypes.string.isRequired,
  typeField: PropTypes.string.isRequired,
  fieldClass: PropTypes.string.isRequired,
  errorClass: PropTypes.string.isRequired,
};