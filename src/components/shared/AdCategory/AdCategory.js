import CreatableSelect from 'react-select/creatable';

function AdCategorySelect(props) {
  const { value, options, onChange, inputId, className } = props;

  return (
    <CreatableSelect
      id={inputId}
      isClearable
      options={options}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
}
export default AdCategorySelect;
