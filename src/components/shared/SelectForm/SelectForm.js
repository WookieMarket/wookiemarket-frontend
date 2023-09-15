import React from 'react';
import Select from 'react-select';

function SelectForm(props) {
  const options = [
    { value: 'available', label: 'available' },
    { value: 'reserved', label: 'reserved' },
    { value: 'sold', label: 'sold' },
  ];
  const { value, onChange, inputId } = props;

  return (
    <Select
      id={inputId}
      options={options}
      value={value} // Asegúrate de que selectedTOpcions sea el valor seleccionado
      onChange={onChange}
    />
  );
}

export default SelectForm;
