import PropTypes from "prop-types";
function Button({ onClick, children, className, id }) {
  return (
    <>
      <button id={id} className={className} onClick={onClick}>
        {children}
      </button>
    </>
  );
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  className: PropTypes.func.isRequired,
  id: PropTypes.func.isRequired
};

export default Button;
