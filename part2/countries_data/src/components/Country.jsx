const Country = ({ country, handleShowSpecificCoutry}) => (
  <div>
    {country.name.common} <button onClick={handleShowSpecificCoutry}> Show </button>
  </div>
)

export default Country;
