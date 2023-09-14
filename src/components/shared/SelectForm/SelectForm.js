import React from 'react';
import Select from 'react-select';

function SelectForm(props) {
  const options = [
    { value: 'available', label: 'available' },
    { value: 'reserved', label: 'reserved' },
    { value: 'sold', label: 'sold' },
  ];
  const { value, onChange } = props;

  return (
    <Select
      options={options}
      value={value} // Asegúrate de que selectedTOpcions sea el valor seleccionado
      onChange={onChange}
    />
  );
}

export default SelectForm;
