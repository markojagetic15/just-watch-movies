import React, { useEffect, useState } from 'react';
import MoviesRepository from '../Infrastructure/MoviesRepository';
import type Genre from '../Domain/Entity/Genre';
import type Movie from '../Domain/Entity/Movie';
import MovieSlider from '../../../components/MovieSlider';
import { Row, Col, notification, DatePicker, Button, Select } from 'antd';
import { BarChartOutlined, LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AssetManager from '../../../helpers/AssetManager';

const movieRepository: MoviesRepository = new MoviesRepository();

const MovieDiscoveryPageController = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newestMovies, setNewestMovies] = useState<Movie[] | null>(null);
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const [movies, setMovies] = useState([]);
  const [results, setResults] = useState<Movie[] | null>(null);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    document.title = 'Discover movies';
    const fetchMovies = async () => {
      try {
        const [latestMovies, movieGenres] = await Promise.all([
          movieRepository.fetchMovies('release_date.asc', '', ''),
          movieRepository.fetchMovieGenres(),
        ]);
        setNewestMovies(latestMovies);
        setGenres(movieGenres);
      } catch (error) {
        notification['error']({ message: error, duration: 4 });
      }
    };

    fetchMovies().then(() => {
      setTimeout(() => setIsLoading(false), 500);
    });
  }, []);

  useEffect(() => {
    const fetchMoviesWithGenres = async (genre: Genre) =>
      await movieRepository.fetchMovies('', `${genre.getId()}`, '');

    genres?.slice(0, 5).map(async (genre: Genre) => {
      const moviesWithGenres: any[] = await fetchMoviesWithGenres(genre);
      setMovies((old) => [...old, { moviesWithGenres, genre }]);
    });

    genres?.map((genre: Genre) => {
      setOptions((old) => [...old, { value: genre.getName(), label: genre.getName() }]);
    });
  }, [genres]);

  const onYearSelect = async (e: any) => {
    setResults(await movieRepository.fetchMovies('', '', JSON.stringify(e.$y)));
    setIsFilter(true);
  };

  const onGenreSelect = async (e: string) => {
    setResults(await movieRepository.fetchMovies('', e.toLowerCase(), ''));
    setIsFilter(true);
  };

  if (isLoading) {
    return (
      <div className="loader-holder">
        <LoadingOutlined className="loader" />
      </div>
    );
  }

  if (isFilter) {
    return (
      <div className="search-results filter-results">
        <div className="container">
          <Row align="middle" style={{ marginBottom: 32 }}>
            <Col lg={20} xs={20}>
              <h1>Filter results</h1>
            </Col>
            <Col lg={4} xs={4} style={{ textAlign: 'right' }}>
              <Button onClick={() => setIsFilter(false)}>Clear filter</Button>
            </Col>
          </Row>
          <div>
            {results.map((result) => (
              <Row className="movie" key={result.getId()} gutter={24}>
                <Col lg={4} xs={8}>
                  <Link to={`/movie/${result.getId()}`}>
                    <img
                      src={
                        result.getPosterPath()
                          ? `https://image.tmdb.org/t/p/w500${result.getPosterPath()}`
                          : AssetManager.getUrl('placeholder.png')
                      }
                      alt={result.getTitle()}
                    />
                  </Link>
                </Col>
                <Col lg={14} xs={16}>
                  <h1>
                    {result.getTitle()}{' '}
                    <p>({result?.getReleaseDate()?.split('-')[0]})</p>
                  </h1>
                  <p>{result.getOverview()}</p>
                  <p style={{ color: '#FBC500', marginTop: 8 }}>
                    {result.getVoteAverage()} <BarChartOutlined />
                  </p>
                </Col>
              </Row>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-discovery">
      <div className="container">
        <div className="discovery-header">
          <h1>Movies &amp; Shows for you</h1>
          <div className="filter-controls">
            <DatePicker
              onChange={(e) => onYearSelect(e)}
              picker="year"
              allowClear
              bordered={false}
              placeholder="Filter by year"
            />
            <Select
              onChange={(e) => onGenreSelect(e)}
              bordered={false}
              options={options}
              defaultValue="Select genre"
              style={{ minWidth: 140 }}
            />
          </div>
        </div>

        <div className="genre-sliders">
          <MovieSlider movies={newestMovies} genre={null} isSingleMovie={false} />
          {movies.slice(0, 5).map((movie) => (
            <MovieSlider
              key={movie.genre?.getId()}
              movies={movie.moviesWithGenres}
              genre={movie.genre}
              isSingleMovie={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDiscoveryPageController;
