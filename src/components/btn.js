const Btn = ({ click, text, change, id }) => {
  return (
    <button onChange={change} onClick={click} id={id}>
      {text}
    </button>
  );
};

export default Btn;
