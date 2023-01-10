import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import MovieRepository from "../Infrastructure/MovieRepository";
import MoviesRepository from "../../MovieDiscovery/Infrastructure/MoviesRepository";
import MovieSlider from "../../../components/MovieSlider";
import { Row, Col, Space, notification } from "antd";
import type Movie from "../Domain/Entity/Movie";
import type Credit from "../Domain/Entity/Credit";
import { StarOutlined, StarFilled, CheckOutlined, LikeOutlined, DislikeOutlined, CopyOutlined, LikeFilled, DislikeFilled, FacebookFilled, BarChartOutlined, ClockCircleOutlined, DollarCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import AssetManager from "../../../helpers/AssetManager";
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
                const [movie, credits, similar] = await Promise.all([
                    movieRepository.fetchMovieById(parseInt(params?.id)),
                    movieRepository.fetchMovieCredits(parseInt(params?.id)),
                    moviesRepository.fetchSimilarMovies(parseInt(params?.id)),
                ]);

                setMovie(movie);
                setCredits(credits);
                setSimilar(similar);
                document.title = movie?.getTitle();

            } catch(error) {
                notification["error"]({
                    message: error,
                    duration: 4,
                });
            }
        }

        setIsLoading(true);
        fetchMovie().then(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        });

    }, [params]);

    useEffect(() => {
        movieRepository.fetchFavorites()?.map(
            (favorite: { key: number, name: string }) => {
                if(favorite.key === movie?.getId()){
                    setFavorite(true)
                    return
                }
            }
        )
    }, [movie]);

    const copyUrl = () => {
        navigator.clipboard.writeText(window.location.href);
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
        }, 3000);
    }

    const handleFavorite = (state: boolean ) => {
        let favorites;
        if(state) {
            favorites = localStorage.getItem("favorites") ? movieRepository.fetchFavorites() : []
            favorites.push({key: movie?.getId(), label: movie?.getTitle()});
            movieRepository.setFavorites(favorites);
        } else {
            favorites = movieRepository.fetchFavorites();
            let indexOfFavorite = 0;
            indexOfFavorite = favorites.findIndex((f : any) => f.key === movie?.getId())
            if(indexOfFavorite > -1) {
                favorites.splice(indexOfFavorite, 1);
            }
            movieRepository.setFavorites(favorites);
        }

        setFavorite(state);
    }

    const socialLink = () => {
        // Won't work locally because window.location.href is localhost but on prod it would work
        window.open(`https://www.facebook.com/sharer/sharer.php?text=${movie?.getTitle()}%0D%0D${movie?.getOverview()}%0D%0D&u=${window.location.href}`)
    }

    if(isLoading) {
        return (
            <div className="loader-holder">
                <LoadingOutlined className="loader"/>
            </div>
        )
    }

    return (
        <>
            {movie === null ? <></> : (
            <div className="single-movie">
                <div className="backdrop-holder" style={{backgroundImage: movie.getBackDropPath() ? `url("https://image.tmdb.org/t/p/w500${movie?.getBackDropPath()}")` : `url("${AssetManager.getUrl("placeholder-bg.png")}")`}}></div>
                <div className="information-holder">
                <Row>
                    <Col lg={12}>
                        <div className="poster">
                            <img src={movie.getPosterPath() ? `https://image.tmdb.org/t/p/w500${movie?.getPosterPath()}` : AssetManager.getUrl("placeholder.png")} alt={`${movie?.getTitle()}`}/>
                            <Row>
                                <Col lg={6} onClick={() => handleFavorite(!favorite)}>
                                    {favorite ? <StarFilled /> : <StarOutlined />}
                                    <p>Favorite</p>
                                </Col>
                                <Col lg={6}>
                                    <CheckOutlined />
                                    <p>Watched</p>
                                </Col>
                                <Col lg={6} onClick={() => {setSetLiked(!liked); setDisliked(false)}}>
                                    {!liked ?
                                        <LikeOutlined/>:
                                        <LikeFilled/>
                                    }
                                    <p>Like</p>
                                </Col>
                                <Col lg={6} onClick={() => {setDisliked(!disliked); setSetLiked(false)}}>
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
                            {similar.length === 0 ?
                                <></> :
                                <div>
                                    <p>Similar movies</p>
                                    <MovieSlider movies={similar} isSingleMovie={true} genre={null}/>
                                </div>
                            }
                        </div>
                    </Col>
                </Row>
            </div>
                <div className={visible ? "visible notification" : "notification"}>Copied to clipboard</div>
            </div>)}
        </>
    )

}

export default SingleMoviePageController;
