const Fields = (props) => {
  if (props.editable) {
    return (
      <input type={props.type} value={props.value} onChange={props.onChange} />
    );
  } else {
    return <span>{props.value}</span>;
  }
};
export default Fields;
