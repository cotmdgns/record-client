const Input = ({
  label,
  type,
  placeholder,
  value,
  change,
  divState,
  style,
  disabled,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={change}
        disabled={disabled}
      />
      <div style={style}>{divState}</div>
    </div>
  );
};
export default Input;
