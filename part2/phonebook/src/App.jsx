import {useState, useEffect } from "react";
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('chargue persosns...')
    personsService.getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

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

    personsService.create(personObjet).then(() => {
      setPersons([...persons, personObjet]);
      setNewName('');
      setNewPhone('');
    })
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