import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

export default function Movies() {
  const [movieList, setMovieList] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  const films = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=49908b5c8ac0f6b1c909cf3e58a43a38"
    )
      .then((res) => res.json())
      .then((json) => {
        setMovieList(json.results);
        setFilteredMovies(json.results);
      });
  };

  useEffect(() => {
    films();
  }, []);

  const handFilter = () => {
    const filterd = movieList.filter(
      (movie) => movie.title.includes(search) || movie.overview.includes(search)
    );
    setFilteredMovies(filterd);
  };
  return (
    <div className="App ">
      <h1 className="title">Movie Search Engine Using React and API</h1>
      <div className="search-box">
        <input
          type="search"
          placeholder=" search for movies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <i className="fa fa-search fa-lg"></i>
        <input type="button" value="Search" onClick={handFilter} />
      </div>
      <div className="row">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie, index) => {
            return (
              <div className="col-md-3 mb-4 " key={index}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body pt-4">
                  <h5 className="card-title "> 
                     {movie.title}</h5>
                  <p className="card-text pt-2 text-left">{movie.overview}</p>
                </div>
              </div>
            );
          })
        ) : (
          <span className="">This movie doesn't exist</span>
        )}
      </div>
     
    </div>
  );
}
