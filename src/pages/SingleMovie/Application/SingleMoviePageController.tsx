import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import MovieRepository from "../Infrastructure/MovieRepository";
import MoviesRepository from "../../MovieDiscovery/Infrastructure/MoviesRepository";
import MovieSlider from "../../../components/MovieSlider";
import { Row, Col, Space } from "antd";
import type Movie from "../Domain/Entity/Movie";
import type Credit from "../Domain/Entity/Credit";
import { StarOutlined, StarFilled, CheckOutlined, LikeOutlined, DislikeOutlined, CopyOutlined, LikeFilled, DislikeFilled, FacebookFilled, BarChartOutlined, ClockCircleOutlined, DollarCircleOutlined } from "@ant-design/icons";
const movieRepository: MovieRepository = new MovieRepository();
const moviesRepository: MoviesRepository = new MoviesRepository();

const SingleMoviePageController = () => {
    const [visible, setVisible] = useState(false);
    const [liked, setSetLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [favorite, setFavorite] = useState(false);

    const [movie, setMovie] = useState<Movie | null>(null);
    const [credits, setCredits] = useState<Credit | null>(null);

    const [similar, setSimilar] = useState<object[]>([]);
    const params = useParams();

    useEffect(() => {
        const fetchMovie = async () => {
            const [movie, credits, similar] = await Promise.all([
                movieRepository.fetchMovieById(parseInt(params.id)),
                movieRepository.fetchMovieCredits(parseInt(params.id)),
                moviesRepository.fetchSimilarMovies(parseInt(params.id)),
            ]);
            setMovie(movie);
            setCredits(credits);
            setSimilar(similar);
        }

        fetchMovie();

    }, []);

    useEffect(() => {
        JSON.parse(localStorage.getItem("favorites"))?.map((favorite: { key: number, name: string }) => favorite.key === movie?.getId() ? setFavorite(true) : setFavorite(false))
    }, [movie]);

    const copyUrl = () => {
        navigator.clipboard.writeText(window.location.href);
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
        }, 2000);
    }

    const handleFavorite = (state: boolean ) => {
        let favorites;
        if(state) {
            favorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : []
            favorites.push({key: movie?.getId(), label: movie?.getTitle()});
            localStorage.setItem("favorites", JSON.stringify(favorites));
        } else {
            favorites = JSON.parse(localStorage.getItem("favorites"));
            let indexOfFavorite = 0;
            favorites.map((favorite: any, index: number) => indexOfFavorite = favorite.id === movie?.getId() ? index : null)
            if(indexOfFavorite > -1) {
                favorites.splice(indexOfFavorite, 1);
            }
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }

        setFavorite(state);
    }

    const socialLink = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?text=${movie?.getTitle()}%0D%0D${movie?.getOverview()}%0D%0D&u=${window.location.href}`)
    }

    return (
        <>
        {movie === null ? <></> : <div className="single-movie">
                <div className="backdrop-holder" style={{backgroundImage: `url("https://image.tmdb.org/t/p/w500${movie?.getBackDropPath()}")`}}></div>
                <div className="information-holder">
                    <Row>
                        <Col lg={12}>
                            <div className="poster">
                                <img src={`https://image.tmdb.org/t/p/w500${movie?.getPosterPath()}`} alt={`${movie?.getTitle()}`}/>
                                <Row>
                                    <Col lg={6} onClick={() => handleFavorite(!favorite)}>
                                        {favorite ? <StarFilled /> : <StarOutlined />}
                                        <p>Favorite</p>
                                    </Col>
                                    <Col lg={6}>
                                        <CheckOutlined />
                                        <p>Watched</p>
                                    </Col>
                                    <Col lg={6} onClick={() => {setSetLiked(!liked);setDisliked(false)}}>
                                        {!liked ?
                                            <LikeOutlined/>:
                                            <LikeFilled/>
                                        }
                                        <p>Like</p>
                                    </Col>
                                    <Col lg={6} onClick={() => {setDisliked(!disliked);setSetLiked(false)}}>
                                        {!disliked ?
                                            <DislikeOutlined/>:
                                            <DislikeFilled/>
                                        }
                                        <p>Dislike</p>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col lg={12}>
                            <div className="info">
                                <Row>
                                    <Col lg={22}>
                                        <h1>{movie?.getTitle()}<span>({movie?.getReleaseDate()?.split("-")[0]})</span></h1>
                                    </Col>
                                    <Col lg={2}>
                                        <Space>
                                            <CopyOutlined onClick={() => copyUrl()}/>
                                            <FacebookFilled onClick={() => socialLink()}/>
                                        </Space>
                                    </Col>
                                </Row>

                                {credits.getCast()?.length === 0 ? <></> :
                                    <>
                                        <p>CAST:</p>
                                        <Row>
                                            <Space size="large">
                                                {credits.getCast()?.slice(0,3).map((member: any) => <Col><p>{member.name}</p><p>{member.character}</p></Col>)}
                                            </Space>
                                        </Row>
                                    </>
                                }

                                {credits.getCrew()?.length === 0 ? <></> :
                                    <>
                                        <p>CREW:</p>
                                        <Row>
                                            <Space size="large">
                                                {credits.getCrew()?.slice(0,3).map((member: any) => <Col><p>{member.name}</p><p>{member.department}</p></Col>)}
                                            </Space>
                                        </Row>
                                    </>
                                }

                                <p>{movie?.getOverview()}</p>
                                <div>
                                    <Row>
                                        <Space size="large">
                                            <Col><p>SCORE</p></Col>
                                            <Col>
                                                <Space>
                                                    <span>{JSON.stringify(movie?.getVoteAverage())}</span>
                                                    <BarChartOutlined />
                                                </Space>
                                            </Col>
                                        </Space>
                                    </Row>
                                    <Row>
                                        <Space size="large">
                                            <Col><p>BUDGET</p></Col>
                                            <Col>
                                                <Space>
                                                    <span>${JSON.stringify(movie?.getBudget())}</span>
                                                    <DollarCircleOutlined />
                                                </Space>
                                            </Col>
                                        </Space>
                                    </Row>
                                    <Row>
                                        <Space size="large">
                                            <Col><p>RUNTIME</p></Col>
                                            <Col>
                                                <Space>
                                                    <span>{JSON.stringify(movie?.getRuntime())}min  </span>
                                                    <ClockCircleOutlined />
                                                </Space>
                                            </Col>
                                        </Space>
                                    </Row>
                                </div>
                                <div>
                                    <p>Similar movies</p>
                                    <MovieSlider movies={similar} isSingleMovie={true}/>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={visible ? "visible notification" : "notification"}>Copied to clipboard</div>
            </div>}
        </>
    );
}

export default SingleMoviePageController;
