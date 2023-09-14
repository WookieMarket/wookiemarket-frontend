import './Form.css';
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
    handleValidation,
    handleChange,
    accept,
    placeholder,
    classValidationMessageLabel,
    validationMessage,
  } = props;

  return (
    <div className={classNameForm + ' element-form'}>
      <label className={classNameLabel} htmlFor={htmlFor}>
        {text}
      </label>
      <input
        className={classNameInput}
        id={inputId}
        type={inputType}
        name={inputName}
        value={value}
        onBlur={handleValidation}
        onChange={handleChange}
        accept={accept}
        placeholder={placeholder}
      />
      <label className={classValidationMessageLabel} htmlFor={htmlFor}>
        {validationMessage}
      </label>
    </div>
  );
}

export default Form;
