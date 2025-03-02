import { useEffect, useState, useTransition } from "react";
import { getCountryData } from "../api/postApi";
import { Loader } from "../components/UI/Loader";
import CountryCard from "../components/Layout/CountryCard";

export const Country = () => {
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);

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

  return (
    <section className="country-section">
      <ul className="grid grid-four-cols">
        {countries.map((curCountry) => {
          return <CountryCard country={curCountry} key={curCountry.id} />;
        })}
      </ul>
    </section>
  );
};
