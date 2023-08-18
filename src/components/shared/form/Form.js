function Form(props) {
  const {
    classNameForm,
    classNameLabel,
    htmlFor,
    text,
    classNameInput,
    inputId,
    inputType,
    inputName,
    value,
    handleChange,
    accept,
    placeholder,
  } = props;

  return (
    <div className={classNameForm}>
      <label className={classNameLabel} htmlFor={htmlFor}>
        {text}
      </label>
      <input
        className={classNameInput}
        id={inputId}
        type={inputType}
        name={inputName}
        value={value}
        onChange={handleChange}
        accept={accept}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Form;
