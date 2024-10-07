const Input = ({ label, type, placeholder, value, change }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={change}
      />
    </div>
  );
};
export default Input;
