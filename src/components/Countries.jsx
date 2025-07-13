import React, { useState, useEffect } from "react";

function Countries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/independent?status=true")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">🌍 Country Explorer</h1>
      {loading ? (
        <p>Loading countries...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {countries.map((country, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded shadow hover:bg-gray-700"
            >
              <img
                src={country.flags.svg}
                alt={country.name.common}
                className="h-32 w-full object-cover mb-2 rounded"
              />
              <h2 className="text-xl font-semibold">
                {country.name.common}
              </h2>
              <p>Capital: {country.capital?.[0] || "N/A"}</p>
              <p>Region: {country.region}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Countries;
