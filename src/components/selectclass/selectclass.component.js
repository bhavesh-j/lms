function SelectClass(props) {
    const conditionForDisablity = !props.classes.length && props.disabledFirst;
    return (
      <select readOnly = {props.readOnly} className={"form-control input-height class-select "+(conditionForDisablity ? 'disabled' : '')}
        name="class" value={props.value} onChange={props.onChange} id={props.id}>
        <option selected disabled={conditionForDisablity}>Select Class...</option>
        {props.classes.map(classRecord => {
          return (
          <option value={classRecord.id} key={classRecord.id}>{classRecord.name}</option>
        );
        })}
      </select>
    );
}

export default SelectClass;