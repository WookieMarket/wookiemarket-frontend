import React from 'react';
import Select from 'react-select';

function SelectForm(props) {
  const options = [
    { value: 'available', label: 'available' },
    { value: 'reserved', label: 'reserved' },
    { value: 'sold', label: 'sold' },
  ];
  const { value, onChange, inputId, className } = props;

  return (
    <Select
      id={inputId}
      options={options}
      value={value} // Asegúrate de que selectedTOpcions sea el valor seleccionado
      onChange={onChange}
      className={className}
    />
  );
}

export default SelectForm;
