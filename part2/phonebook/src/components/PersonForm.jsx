   
const PersonForm = ({addPerson, newName, newNumber, handleNameChangue, handleNumberChangue}) =>  {

    return (
    <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChangue} />
        </div>
        <div>
          phone: <input value={newNumber} onChange={handleNumberChangue} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
)}

export default PersonForm;
