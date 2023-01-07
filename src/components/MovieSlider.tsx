import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { Tooltip } from 'antd';
import { Link } from "react-router-dom";
import type Movie from "../pages/MovieDiscovery/Domain/Entity/Movie"

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    responsive: [
        {
            breakpoint: 1440,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 1080,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        }
    ]
};

const MovieCard = ({movie}: {movie: Movie}) => {
    const [hovered, setHovered] = useState(false);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        JSON.parse(localStorage.getItem("favorites"))?.map((favorite: { key: number, name: string }) => favorite.key === movie.getId() ? setFavorite(true) : setFavorite(false))
    }, []);

    const handleFavorite = ({movie, state, e}: { movie: Movie, state: boolean, e: React.MouseEvent<HTMLElement> }) => {
        e.preventDefault();
        e.stopPropagation();
        let favorites;
        if(state) {
            favorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : []
            favorites.push({key: movie?.getId(), label: movie?.getTitle()});
            localStorage.setItem("favorites", JSON.stringify(favorites));
        } else {
            favorites = JSON.parse(localStorage.getItem("favorites"));
            let indexOfFavorite = 0
            favorites.map((favorite: { key: number, name: string }, index: number) => indexOfFavorite = favorite.key === movie.getId() ? index : null)
            if(indexOfFavorite > -1) {
                favorites.splice(indexOfFavorite, 1);
            }
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }

        setFavorite(state);
    }

    return (
        <Link to={`/movie/${movie.getId()}`}>
            <div className={hovered ? "hover movie-card" : "movie-card"}
                 onMouseEnter={() => setHovered(true)}
                 onMouseLeave={() => setHovered(false)}
            >
                <img src={`https://image.tmdb.org/t/p/w500${movie.getPosterPath()}`} alt={`${movie.getTitle()}`}/>
                <p>{movie.getTitle()}</p>
                <Tooltip title={favorite ? "Remove from favorites" : "Add to favorites"}>
                    {favorite ?
                        <StarFilled onClick={(e) => handleFavorite({movie: movie, state: false, e:e})}/> :
                        <StarOutlined onClick={(e) => handleFavorite({movie: movie, state: true, e:e})}/>
                    }
                </Tooltip>
            </div>
        </Link>
    )
}

const MovieSlider = ({movies, isSingleMovie}: { movies: Array<any>, isSingleMovie: Boolean}) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: isSingleMovie ? 3 : 6,
        slidesToScroll: isSingleMovie ? 1 : 4,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 1080,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    };
    return (
        <>
            <Slider {...settings}>
                {movies.slice(0, 10).map((movie) => <MovieCard movie={movie}/>)}
            </Slider>
        </>
    )
}

export const MovieSliderWithGenre = ({movies, genre}: { movies: Array<Movie>, genre: any}) => {
    return (
        <>
            <h2>{genre.length === 0 ? "Latest movies": genre.name}</h2>
            <Slider {...settings}>
                {movies.slice(0, 10).map((movie) => <MovieCard movie={movie}/>)}
            </Slider>
        </>
    )
}

export default MovieSlider
