import Person from './Person'

const Persons = ({ persons, handleDelete }) => (
  <div>
    {persons.map(person => (
      <Person key={person.id} person={person} handleDelete={() => handleDelete(person.id)} />
    ))}
  </div>
)

export default Persons;