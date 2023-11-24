import { useEffect, useState } from "react";
import Country from "./components/Country";
import countryService from "./services/countries";

function App() {
  const [searchWord, setSearchWord] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [filteredCountryList, setFilteredCountryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    countryService.getAllCountries().then((response) => {
      setCountryList(response.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setFilteredCountryList(filterCountries(searchWord, countryList));
  }, [searchWord, countryList]);

  const filterCountries = (word, list) =>
    list.filter((country) =>
      country.name.common.toLowerCase().includes(word.toLowerCase())
    );

  const showCountry = (event, countryName) => {
    event.preventDefault();
    const country = countryList.find(
      (country) => country.name.common === countryName
    );
    setFilteredCountryList([country]);
  };

  let display;
  if (isLoading) {
    display = <p>Loading countries...</p>;
  } else if (filteredCountryList.length > 10) {
    display = <p>Too many matches, specify another filter</p>;
  } else if (filteredCountryList.length > 1) {
    display = filteredCountryList.map((country) => (
      <div key={country.name.common}>
        {country.name.common} {country.flag}
        <button onClick={(e) => showCountry(e, country.name.common)}>
          show
        </button>
      </div>
    ));
  } else if (filteredCountryList.length === 1) {
    display = <Country country={filteredCountryList[0]} />;
  } else {
    display = <p>No matches, specify another filter</p>;
  }

  return (
    <div>
      find countries <br />
      <input
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
      ></input>
      <div>{display}</div>
    </div>
  );
}

export default App;
