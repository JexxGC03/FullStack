import Country from './Country'
import SpecificCountry from './SpecificCountry'


const getCountryKey = (country) => {
  if (country.idd && country.idd.root && country.idd.suffixes && country.idd.suffixes.length > 0) {
    // Combina root, suffix y cca3 para asegurar unicidad
    return country.idd.root + country.idd.suffixes[0] + '-' + (country.cca3 || country.name.common);
  }
  return country.cca3 || country.name.common;
}


const Countries = ({ countries, handleShowSpecificCoutry }) => {
  if (typeof countries === 'string') {
    return <div>{countries}</div>;
  }
  if (Array.isArray(countries)) {
    if (countries.length === 0) return null;
    return (
      <div>
        {countries.map(country => (
          <Country key={getCountryKey(country)} country={country} handleShowSpecificCoutry={() => handleShowSpecificCoutry(country.name.common)} />
        ))}
      </div>
    );
  }
  // Si es un solo país (objeto)
  if (typeof countries === 'object' && countries !== null) {
    return <SpecificCountry country={countries} />;
  }
  return null;
}

export default Countries;