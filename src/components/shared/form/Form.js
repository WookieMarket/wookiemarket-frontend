function Form(props) {
  const {
    classNameLabel,
    htmlFor,
    text,
    classNameInput,
    inputId,
    type,
    inputName,
    value,
    handleChange,
    placeholder,
  } = props;

  return (
    <div className={classNameLabel}>
      <label htmlFor={htmlFor}>{text}</label>
      <input
        className={classNameInput}
        id={inputId}
        type={type}
        name={inputName}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default Form;
