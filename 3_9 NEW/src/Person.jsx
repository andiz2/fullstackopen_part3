const Person = ({name, number, deletePerson}) => {
    console.log('namee', name)
    return (
        <>
            {name} {number} <button onClick = {deletePerson}>delete </button> <br />
        </>
    )
}
 
export default Person;