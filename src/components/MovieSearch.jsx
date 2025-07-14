import React, { useState } from "react";

const API_KEY = import.meta.env.VITE_MOVIESEARCH_API_KEY;

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

    const searchMovies = async () => {
    if (query.trim() === "") return;
    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
      const data = await res.json();

      if (data.Response === "False") {
        setError(data.Error);
      } else {
        setMovies(data.Search);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div  className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">🎬 Movie Search</h1>
         <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 rounded text-black w-64"
          onKeyDown={(e) => e.key === "Enter" && searchMovies()}
        />
        <button
          onClick={searchMovies}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {movies.map((movie, index) => (
          <div key={index} className="bg-white/10 p-4 rounded shadow">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
              alt={movie.Title}
              className="w-full h-72 object-cover mb-2 rounded"
            />
            <h2 className="text-xl font-semibold">{movie.Title}</h2>
            <p className="text-sm text-gray-300">{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
