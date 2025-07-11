import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    if (!newName.trim() || !newPhone.trim()) {
      alert('Por favor, completa ambos campos antes de agregar.');
      return;
    }
    if (isNameExists(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const personObjet = {
      name: newName,
      phone: newPhone,
      id: persons.length + 1, 
    };
    setPersons([...persons, personObjet]);
    setNewName('');
    setNewPhone('');
  }

  const handleNameChangue = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChangue = (event) => {
    setNewPhone(event.target.value);
  };

  const isNameExists = (name) => (persons.some(person => person.name === name));

  const handleFilterChangue = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChangue} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newPhone={newPhone}
        handleNameChangue={handleNameChangue}
        handlePhoneChangue={handlePhoneChangue}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App