import {useState, useEffect } from "react";
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from './services/persons'
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

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
    handleAddOrUpdatePerson(newName, newPhone);
  }
  
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  
  //Controladores
  const handleAddOrUpdatePerson = (name, phone) => {
    const existingPerson = persons.find(person => person.name === name);
    if (existingPerson) {
      if (existingPerson.phone === phone) {
        alert('El contacto ya existe con el mismo número.');
        return;
      } else {
        console.log("Ide", existingPerson.id)
        const confirmUpdate = window.confirm(
          `${name} ya está en la agenda, ¿deseas actualizar el número?`
        );
        if (confirmUpdate) {
          const updatedPerson = { ...existingPerson, phone, id: String(existingPerson.id) };
          personsService
            .update(String(existingPerson.id), updatedPerson)
            .then((returnedPerson) => {
              console.log("returned person", returnedPerson)
              setPersons(persons.map(p => String(p.id) !== String(existingPerson.id) ? p : returnedPerson));
              setNewName('');
              setNewPhone('');
              setNotification({
                message: `Se ha actualizado el telefono de ${returnedPerson.name} a "${returnedPerson.phone}" con exito`,
                type: 'success'
              })
              setTimeout(() => {
                setNotification(null)
              }, 5000)
            })
            .catch((error) => {
              setNotification({
                message: error.response?.data?.error || `No fue posible actualizar la información de ${existingPerson.name}. Puede que ya haya sido eliminada del servidor.`,
                type: 'error'
              })
              setTimeout(() => {
                setNotification(null)
              }, 5000)
            });
        }
        return;
      }
    }

    // Calcular el siguiente id como string
    const maxId = persons.length > 0 ? Math.max(...persons.map(p => Number(p.id))) : 0;
    const personObjet = {
      name,
      phone,
        id: String(maxId + 1),
    };

    personsService.create(personObjet).then(() => {
      setPersons([...persons, personObjet]);
      setNewName('');
      setNewPhone('');
      setNotification({
        message: `Se ha creado el contacto de ${personObjet.name} con el número: "${personObjet.phone}"`,
        type: 'success'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    })
    
  }

  const handleNameChangue = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChangue = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilterChangue = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (id) => {
    const person = persons.find((p) => String(p.id) === String(id))
    const confirmDelete = window.confirm(`¿Seguro que deseas eliminar a ${person?.name}?`)

    if (confirmDelete) {
      personsService.suprimir(String(id)).then(() => {
        setPersons(persons.filter((p) => String(p.id) !== String(id)))
      })
    }
  }

  //--------------------------------------------

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} />
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
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App