const Person = ({ person, handleDelete }) => (
  <div>
    {person.name} {person.phone}
    <button onClick={handleDelete}>delete!</button>
  </div>
)

export default Person;
