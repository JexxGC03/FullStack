
const SpecificCountry = ({ country }) => (
  <div>
    <h2>{country.name.common} </h2> 
    <p>Capital: {country.capital} </p>
    <p>Area: {country.area} </p>
    <h3>Languages</h3>
    <ul>
      <Languages languages={Object.values(country.languages)} />
    </ul>
    <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="200" />
  </div>
)

const Languages = ({ languages }) => (
  <>
    {languages.map(language => (
      <li key={language}>{language}</li>
    ))}
  </>
)

export default SpecificCountry;