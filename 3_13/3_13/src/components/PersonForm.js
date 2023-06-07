const PersonForm = (props) => {
	console.log('newPerson', props.newPerson)
	console.log('props din newPerson', props)

	return (
		<div>
			<form onSubmit = {props.addPerson}>
		        <div>
		          name: <input value = {props.newPerson}
		          onChange = {props.handlePersonChange}
		          />
		        </div>
		        <div>
		          number: <input value = {props.newNumber}
		          onChange = {props.handleNumberChange}
		          />
		        </div>
		        <div>
		          <button type="submit">add</button>
		        </div>
		      </form>
		</div>
	)
}

export default PersonForm;
