import React, {useEffect, useState} from 'react';
import MoviesRepository from "../Infrastructure/MoviesRepository";
import type Genre from "../Domain/Entity/Genre";
import type Movie from "../Domain/Entity/Movie";
import { MovieSliderWithGenre } from "../../../components/MovieSlider";
import { Row, Col } from "antd";
const movieRepository: MoviesRepository = new MoviesRepository();

const MovieDiscoveryPageController = () => {
    const [newestMovies, setNewestMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const [latestMovies, movieGenres] = await Promise.all([
                // Fetching latest movies in ascending order
                movieRepository.fetchMovies("release_date.asc", ""),
                movieRepository.fetchMovieGenres(),
            ]);
            setNewestMovies(latestMovies);
            setGenres(movieGenres);
        }

        fetchMovies();
    }, []);


    useEffect(() => {
        const fetchMoviesWithGenres = async (genre: Genre) => {
            return await movieRepository.fetchMovies("", `${genre.getId()}`);
        }

        genres.slice(0, 5).map(async (genre: Genre) => {
            const moviesWithGenres: Movie[] = await fetchMoviesWithGenres(genre);
            setMovies(old => [...old, {moviesWithGenres, genre}]);
        });

    }, [genres]);

    return (
        <div className="movie-discovery">
            <div className="container">
                <Row>
                    <Col lg={12} xs={24}>
                        <h1>Movies and TV shows for you</h1>
                    </Col>
                </Row>
                <div className="genre-sliders">
                    <MovieSliderWithGenre movies={newestMovies} genre={[]}/>
                    {movies.slice(0, 5).map((movie) => <MovieSliderWithGenre movies={movie.moviesWithGenres} genre={movie.genre}/>)}
                </div>
            </div>
        </div>
    );

}

export default MovieDiscoveryPageController;
