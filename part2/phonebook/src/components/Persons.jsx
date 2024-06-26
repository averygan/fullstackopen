const Persons = ({persons, filter}) => {
    const filteredPersons = filter === '' ? persons :
        persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        filteredPersons.map((person) => (
        <p key={person.name}>{person.name} {person.number}</p>
        ))
    )
}

export default Persons