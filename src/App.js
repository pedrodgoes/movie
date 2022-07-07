import { useEffect, useState } from "react";

import MovieCard from "./MovieCard";

import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://omdbapi.com/?apikey=ea4f0ff';

const App = () => {
    const [movies, setMovies] = useState();
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search)
    }
    
    useEffect(() => {
        searchMovies('Superman');
    }, []);

    return (
        <div className="app">
            <h1>Filmes Book</h1>

            <div className="search">
                <input 
                    placeholder="Buscar em filmes"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}/>

                <img 
                    src= {SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}/>
            </div>

           {
               movies?.length > 0
               ? (
                <div className="container">
                  {movies.map((movie) => (
                    <MovieCard movie={movie} />
                  ))}
                </div>
               ) : (
                <div className="empty">
                    <h2>Sem filmes encontrados</h2>
                </div>
               )
           }
        </div>
    )
}

export default App;