const Filter = (props) => {
	return (
		<div>
			filter shown with <input value = {props.showAll.content}
            onChange = {props.filterPerson}
            />
		</div>
		)
}

export default Filter;
