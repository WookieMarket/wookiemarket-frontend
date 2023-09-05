import CreatableSelect from 'react-select/creatable';

function AdCategorySelect(props) {
  const { value, options, onChange } = props;

  return (
    <CreatableSelect
      isClearable
      options={options}
      value={value}
      onChange={onChange}
    />
  );
}
export default AdCategorySelect;
