//importing props from prop-types for using this button component in different pages and pass different key pair values like on click, class name etc
import PropTypes from "prop-types";

//main componenet function
function Button({ onClick, children, className, id }) {
  return (
    <>
      {/* declarin the values in brackets */}
      <button id={id} className={className} onClick={onClick}>
        {children}
      </button>
    </>
  );
}

//declaring the proptypes that we will be passing later on the code base
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  className: PropTypes.func.isRequired,
  id: PropTypes.func.isRequired
};

//exporting the created componenet function
export default Button;
