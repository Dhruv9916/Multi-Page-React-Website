import { useEffect, useState, useTransition } from "react";
import { getCountryData } from "../api/postApi";
import { Loader } from "../components/UI/Loader";
import CountryCard from "../components/Layout/CountryCard";
import SearchFilter from "../components/UI/SearchFilter";

export const Country = () => {
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);

  const [search, setSearch] = useState();
  const [filter, setFilter] = useState("all");

  //USUAL METHOD
  // useEffect(async () => {
  //   const res = await fetch(
  //     "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags"
  //   );

  //   const data = res.json();
  //   setData(data);
  // }, []);

  useEffect(() => {
    startTransition(async () => {
      const res = await getCountryData();
      // console.log(res);
      setCountries(res.data);
    });
  }, []);

  if (isPending) return <Loader />;

  //console.log(search, filter);

  //Logic for Search Functionality and Filter Functionality

  const searchCountry = (country) => {
    if (search) {
      return country.name.common.toLowerCase().includes(search.toLowerCase());
    }
    return country;
  };

  const filterRegion = (country) => {
    if (filter === "all") return country;
    return country.region === filter;
  };

  const filterCountries = countries.filter(
    (country) => searchCountry(country) && filterRegion(country)
  );

  return (
    <section className="country-section">
      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        countries={countries}
        setCountries={setCountries}
      />
      <ul className="grid grid-four-cols">
        {filterCountries.map((curCountry) => {
          return <CountryCard country={curCountry} key={curCountry.id} />;
        })}
      </ul>
    </section>
  );
};
