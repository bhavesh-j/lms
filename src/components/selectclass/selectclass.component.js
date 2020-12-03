function SelectClass(props) {
    const conditionForDisablity = !props.classes.length && props.disabledFirst;
    return (
      <select disabled={props.readOnly || conditionForDisablity} className={"form-control input-height class-select"}
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

function SelectClassSection(props) {
  const classFilter = props.classes.filter(classRecord => classRecord.id === Number(props.selectedClass));
  const sectionList = classFilter.length ? classFilter[0].sections : [];
  return (
    <select name="class-section" id="class-section-select" disabled={props.readOnly}
      onChange={props.onChange} value={props.value} className="form-control">
      <option selected value="">Select...</option>
      {sectionList.map(section => {
        return (
        <option key={section.id} value={section.id}>{section.name}</option>
        );
      })}
    </select>
  );
}

export default SelectClass;
export {SelectClassSection};