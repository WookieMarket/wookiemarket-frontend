import CreatableSelect from 'react-select/creatable';

function AdCategorySelect(props) {
  const { value, options, onChange, inputId } = props;

  return (
    <CreatableSelect
      id={inputId}
      isClearable
      options={options}
      value={value}
      onChange={onChange}
    />
  );
}
export default AdCategorySelect;
