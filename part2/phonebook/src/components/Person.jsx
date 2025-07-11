const Person = ({ person }) => (
  <div>
    {person.name} {person.phone || person.number}
  </div>
)

export default Person;
