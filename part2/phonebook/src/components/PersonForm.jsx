   
const PersonForm = ({addPerson, newName, newPhone, handleNameChangue, handlePhoneChangue}) =>  {

    return (
    <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChangue} />
        </div>
        <div>
          phone: <input value={newPhone} onChange={handlePhoneChangue} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
)}

export default PersonForm;
