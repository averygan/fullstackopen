const Persons = ({persons, filter, deletePerson}) => {
    const filteredPersons = filter === '' ? persons :
        persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        filteredPersons.map((person) => (
        <p key={person.id}>{person.name} {person.number}
            <button onClick={() => deletePerson(person.id)}>delete</button>
        </p>
        ))
    )
}

export default Persons