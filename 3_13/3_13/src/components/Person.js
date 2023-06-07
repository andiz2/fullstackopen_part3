import React from 'react'
import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'




const Person = (props) => {



	console.log('props', props)
	return (
		<>
			{props.name} {props.number}  
			<div>
				<button onClick = {props.deleteContact}>Delete {props.id}</button> <br />
			</div>
		</>
	)
}

export default Person