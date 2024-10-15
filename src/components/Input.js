const Input = ({
  label,
  type,
  placeholder,
  value,
  change,
  divState,
  style,
  ref,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={change}
      />
      <div style={style}>{divState}</div>
    </div>
  );
};
export default Input;
