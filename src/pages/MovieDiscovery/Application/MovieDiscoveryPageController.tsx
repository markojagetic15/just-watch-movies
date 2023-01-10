import React, { useEffect, useState } from 'react';
import MoviesRepository from "../Infrastructure/MoviesRepository";
import type Genre from "../Domain/Entity/Genre";
import type Movie from "../Domain/Entity/Movie";
import MovieSlider from "../../../components/MovieSlider";
import { Row, Col, notification, DatePicker, Button, Select } from "antd";
import { BarChartOutlined, LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import AssetManager from "../../../helpers/AssetManager";
const movieRepository: MoviesRepository = new MoviesRepository();

const MovieDiscoveryPageController = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [newestMovies, setNewestMovies] = useState<Movie[] | null>(null);
    const [genres, setGenres] = useState<Genre[] | null>(null);
    const [movies, setMovies] = useState([]);
    const [results, setResults] = useState<Movie[] | null>(null);
    const [isFilter, setIsFilter] = useState<boolean>(false);
    const [options, setOptions] = useState([])

    useEffect(() => {
        document.title = 'Discover movies';
        const fetchMovies = async () => {
            try {
                const [latestMovies, movieGenres] = await Promise.all([
                    // Fetching latest movies in ascending order
                    movieRepository.fetchMovies("release_date.asc", "", ""),
                    movieRepository.fetchMovieGenres(),
                ]);
                setNewestMovies(latestMovies);
                setGenres(movieGenres);
            } catch (error) {
                notification["error"]({
                    message: error,
                    duration: 4,
                })
            }
        }

        fetchMovies().then(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        });
    }, []);

    useEffect(() => {
        const fetchMoviesWithGenres = async (genre: Genre) => {
            return await movieRepository.fetchMovies("", `${genre.getId()}`, "");
        }

        genres?.slice(0, 5).map(async (genre: Genre) => {
            const moviesWithGenres: any[] = await fetchMoviesWithGenres(genre);
            setMovies(old => [...old, {moviesWithGenres, genre}]);
        });

        genres?.map((genre: Genre) => {
            setOptions(old => [...old, {value: genre.getName(), label: genre.getName()}])
        })

    }, [genres]);


    const onYearSelect = async (e: any) => {
        setResults(await movieRepository.fetchMovies("", "", JSON.stringify(e.$y)))
        setIsFilter(true);
    }

    const onGenreSelect = async (e: string) => {
        setResults(await movieRepository.fetchMovies("", e.toLowerCase(), ""))
        setIsFilter(true);
    }

    if(isLoading) {
        return (
            <div className="loader-holder">
                <LoadingOutlined className="loader"/>
            </div>
        )
    }

    if(isFilter) {
        return (
            <div className="search-results filter-results">
                <div className="container">
                    <Row>
                        <Col lg={22} xs={24}>
                            <h1>Filter results</h1>
                        </Col>
                        <Col lg={2} xs={24}>
                            <Button onClick={() => setIsFilter(false)}>Remove filter</Button>
                        </Col>
                    </Row>
                    <div>
                        {results.map((result) =>
                            <Row className="movie">
                                <Col lg={4}>
                                    <Link to={`/movie/${result.getId()}`}>
                                        <img src={result.getPosterPath() ? `https://image.tmdb.org/t/p/w500${result.getPosterPath()}` : AssetManager.getUrl("placeholder.png.")} alt={`${result.getTitle()}`}/>
                                    </Link>
                                </Col>
                                <Col lg={10}>
                                    <h1>{result.getTitle()} <p>({result?.getReleaseDate()?.split("-")[0]})</p></h1>
                                    <p>{result.getOverview()}</p>
                                    <h1>{result.getVoteAverage()} <BarChartOutlined /></h1>
                                </Col>
                            </Row>
                        )}
                    </div>
                </div>
        </div>)
    }

    return (
        <div className="movie-discovery">
            <div className="container">
                <Row gutter={24}>
                    <Col lg={18} xs={24} md={24}>
                        <h1>Movies and TV shows for you</h1>
                    </Col>
                    <Col lg={3} xs={24}>
                        <DatePicker onChange={(e) => onYearSelect(e)} picker="year" allowClear bordered={false}/>
                    </Col>
                    <Col lg={3} xs={24}>
                        <Select onChange={(e) => onGenreSelect(e)} bordered={false} options={options} defaultValue="Select genre"/>
                    </Col>
                </Row>
                    <div className="genre-sliders">
                        <MovieSlider movies={newestMovies} genre={null} isSingleMovie={false}/>
                        {movies.slice(0, 5).map((movie) => <MovieSlider movies={movie.moviesWithGenres} genre={movie.genre} isSingleMovie={false}/>)}
                    </div>
            </div>
        </div>
    );

}

export default MovieDiscoveryPageController;
