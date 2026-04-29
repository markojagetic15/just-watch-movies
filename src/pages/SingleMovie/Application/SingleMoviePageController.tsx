import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieRepository from '../Infrastructure/MovieRepository';
import MoviesRepository from '../../MovieDiscovery/Infrastructure/MoviesRepository';
import MovieSlider from '../../../components/MovieSlider';
import { Row, Col, Space } from 'antd';
import type Movie from '../Domain/Entity/Movie';
import type Credit from '../Domain/Entity/Credit';
import {
  StarOutlined,
  StarFilled,
  CheckOutlined,
  LikeOutlined,
  DislikeOutlined,
  CopyOutlined,
  LikeFilled,
  DislikeFilled,
  FacebookFilled,
  BarChartOutlined,
  ClockCircleOutlined,
  DollarCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import AssetManager from '../../../helpers/AssetManager';

const movieRepository: MovieRepository = new MovieRepository();
const moviesRepository: MoviesRepository = new MoviesRepository();

const SingleMoviePageController = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [liked, setSetLiked] = useState<boolean>(false);
  const [disliked, setDisliked] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);

  const [movie, setMovie] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<Credit | null>(null);
  const [similar, setSimilar] = useState<Movie[] | null>(null);

  const params = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const [movieData, creditsData, similarData] = await Promise.all([
          movieRepository.fetchMovieById(parseInt(params?.id)),
          movieRepository.fetchMovieCredits(parseInt(params?.id)),
          moviesRepository.fetchSimilarMovies(parseInt(params?.id)),
        ]);
        setMovie(movieData);
        setCredits(creditsData);
        setSimilar(similarData);
        document.title = movieData?.getTitle();
      } catch (error) {
        console.error(error);
      }
    };

    setIsLoading(true);
    fetchMovie().then(() => {
      setTimeout(() => setIsLoading(false), 500);
    });
  }, [params]);

  useEffect(() => {
    movieRepository.fetchFavorites()?.forEach((fav: { key: number; name: string }) => {
      if (fav.key === movie?.getId()) setFavorite(true);
    });
  }, [movie]);

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  };

  const handleFavorite = (state: boolean) => {
    let favorites;
    if (state) {
      favorites = localStorage.getItem('favorites') ? movieRepository.fetchFavorites() : [];
      favorites.push({ key: movie?.getId(), label: movie?.getTitle() });
    } else {
      favorites = movieRepository.fetchFavorites();
      const idx = favorites.findIndex((f: any) => f.key === movie?.getId());
      if (idx > -1) favorites.splice(idx, 1);
    }
    movieRepository.setFavorites(favorites);
    setFavorite(state);
  };

  const socialLink = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?text=${movie?.getTitle()}%0D%0D${movie?.getOverview()}%0D%0D&u=${window.location.href}`
    );
  };

  if (isLoading) {
    return (
      <div className="loader-holder">
        <LoadingOutlined className="loader" />
      </div>
    );
  }

  if (movie === null) return <></>;

  return (
    <div className="single-movie">
      <div
        className="backdrop-holder"
        style={{
          backgroundImage: movie.getBackDropPath()
            ? `url("https://image.tmdb.org/t/p/w1280${movie.getBackDropPath()}")`
            : `url("${AssetManager.getUrl('placeholder-bg.png')}")`,
        }}
      />

      <div className="information-holder">
        <Row>
          <Col lg={10} xs={24}>
            <div className="poster">
              <img
                src={
                  movie.getPosterPath()
                    ? `https://image.tmdb.org/t/p/w500${movie.getPosterPath()}`
                    : AssetManager.getUrl('placeholder.png')
                }
                alt={movie?.getTitle()}
              />
              <Row className="action-row">
                <Col lg={6} onClick={() => handleFavorite(!favorite)}>
                  {favorite ? <StarFilled style={{ color: '#FBC500' }} /> : <StarOutlined />}
                  <p>Favorite</p>
                </Col>
                <Col lg={6}>
                  <CheckOutlined />
                  <p>Watched</p>
                </Col>
                <Col lg={6} onClick={() => { setSetLiked(!liked); setDisliked(false); }}>
                  {liked ? <LikeFilled style={{ color: '#FBC500' }} /> : <LikeOutlined />}
                  <p>Like</p>
                </Col>
                <Col lg={6} onClick={() => { setDisliked(!disliked); setSetLiked(false); }}>
                  {disliked ? <DislikeFilled style={{ color: '#78A6B8' }} /> : <DislikeOutlined />}
                  <p>Dislike</p>
                </Col>
              </Row>
            </div>
          </Col>

          <Col lg={14} xs={24}>
            <div className="info">
              <Row align="middle" style={{ marginBottom: 8 }}>
                <Col flex="auto">
                  <h1>
                    {movie?.getTitle()}
                    <span>({movie?.getReleaseDate()?.split('-')[0]})</span>
                  </h1>
                </Col>
                <Col>
                  <div className="social-actions">
                    <button className="social-btn" onClick={copyUrl}>
                      <CopyOutlined /> Copy link
                    </button>
                    <button className="social-btn" onClick={socialLink}>
                      <FacebookFilled /> Share
                    </button>
                  </div>
                </Col>
              </Row>

              <div className="movie-meta">
                <div className="meta-item">
                  <span className="meta-label">Score</span>
                  <span className="meta-value">
                    {JSON.stringify(movie?.getVoteAverage())} <BarChartOutlined />
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Runtime</span>
                  <span className="meta-value">
                    {JSON.stringify(movie?.getRuntime())} min <ClockCircleOutlined />
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Budget</span>
                  <span className="meta-value">
                    ${JSON.stringify(movie?.getBudget())} <DollarCircleOutlined />
                  </span>
                </div>
              </div>

              <p style={{ marginBottom: 20 }}>{movie?.getOverview()}</p>

              {credits?.getCast()?.length > 0 && (
                <>
                  <span className="info-section-label">Cast</span>
                  <Row style={{ marginBottom: 20 }}>
                    <Space size={24}>
                      {credits.getCast()?.slice(0, 3).map((member: any) => (
                        <div key={member.name} className="cast-member">
                          <p>{member.name}</p>
                          <p>{member.character}</p>
                        </div>
                      ))}
                    </Space>
                  </Row>
                </>
              )}

              {credits?.getCrew()?.length > 0 && (
                <>
                  <span className="info-section-label">Crew</span>
                  <Row style={{ marginBottom: 20 }}>
                    <Space size={24}>
                      {credits.getCrew()?.slice(0, 3).map((member: any) => (
                        <div key={member.name} className="cast-member">
                          <p>{member.name}</p>
                          <p>{member.department}</p>
                        </div>
                      ))}
                    </Space>
                  </Row>
                </>
              )}

              {similar?.length > 0 && (
                <div style={{ marginTop: 24 }}>
                  <span className="info-section-label">Similar movies</span>
                  <MovieSlider movies={similar} isSingleMovie={true} genre={null} />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>

      <div className={visible ? 'visible notification' : 'notification'}>
        Copied to clipboard
      </div>
    </div>
  );
};

export default SingleMoviePageController;
