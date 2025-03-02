import { useEffect, useState, useTransition } from "react";
import { getCountryData } from "../api/postApi";
import { Loader } from "../components/UI/Loader";
import CountryCard from "../components/Layout/CountryCard";
import SearchFilter from "../components/UI/SearchFilter";
import Pagination from "../components/UI/Pagination";

export const Country = () => {
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);

  const [search, setSearch] = useState();
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    startTransition(async () => {
      const res = await getCountryData();
      setCountries(res.data);
    });
  }, []);

  if (isPending) return <Loader />;

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterCountries.slice(indexOfFirstItem, indexOfLastItem);

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
        {currentItems.map((curCountry) => {
          return <CountryCard country={curCountry} key={curCountry.id} />;
        })}
      </ul>
      <Pagination
        totalItems={filterCountries.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        displayPageNumbers={3} // Only show Prev 1 2 3 Next
      />
    </section>
  );
};
