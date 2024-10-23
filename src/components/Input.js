const Input = ({
  label,
  type,
  placeholder,
  value,
  change,
  divState,
  style,
  styleInput,
  disabled,
  click,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={change}
        onClick={click}
        disabled={disabled}
        style={styleInput}
      />
      <div style={style}>{divState}</div>
    </div>
  );
};
export default Input;
