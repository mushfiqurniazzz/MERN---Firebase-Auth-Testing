//importing props from prop-types for using this input component in different pages and pass different key pair values like value, onchange, placeholder, class name etc
import PropTypes from "prop-types";

//main componenet function
function Input({ type, placeholder, value, onChange }) {
  return (
    <>
      {/* declarin the values in brackets */}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

////declaring the proptypes that we will be passing later on the code base
Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

//exporting the created componenet function
export default Input;
