import React, { useEffect, useState } from "react";
import AssetManager from "../helpers/AssetManager";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { Tooltip } from 'antd';
import { Link } from "react-router-dom";
import type Movie from "../pages/MovieDiscovery/Domain/Entity/Movie";
import MovieRepository from "../pages/SingleMovie/Infrastructure/MovieRepository";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const movieRepository = new MovieRepository();

const MovieCard = ({movie, isSingleMovie}: {movie: Movie, isSingleMovie: boolean}) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const [favorite, setFavorite] = useState<boolean>(false);

    useEffect(() => {
        movieRepository.fetchFavorites()?.map(
            (favorite: { key: number, name: string }) => {
                if(favorite.key === movie.getId()){
                    setFavorite(true)
                    return;
                }
            }
        );
    }, []);

    const handleFavorite = ({movie, state, e}: { movie: Movie, state: boolean, e: React.MouseEvent<HTMLElement> }) => {
        e.preventDefault();
        e.stopPropagation();
        let favorites;
        if(state) {
            // Adding movie to favorites
            favorites = localStorage.getItem("favorites") ? movieRepository.fetchFavorites() : []
            favorites.push({key: movie?.getId(), label: movie?.getTitle()});
            movieRepository.setFavorites(favorites);
        } else {
            // Removing movie from items
            favorites = movieRepository.fetchFavorites();
            let indexOfFavorite = 0;
            indexOfFavorite = favorites.findIndex((f : any) => f.key === movie.getId())
            if(indexOfFavorite > -1) {
                favorites.splice(indexOfFavorite, 1);
            }
            movieRepository.setFavorites(favorites);
        }

        setFavorite(state);
    }

    return (
        <Link to={`/movie/${movie.getId()}`}>
            <div className={hovered ? "hover movie-card" : "movie-card"}
                 onMouseEnter={() => setHovered(true)}
                 onMouseLeave={() => setHovered(false)}
            >
                <img src={movie.getPosterPath() ? `https://image.tmdb.org/t/p/w500${movie.getPosterPath()}` : AssetManager.getUrl("placeholder.png")} alt={`${movie.getTitle()}`}/>
                {isSingleMovie ? <></> :
                    <>
                        <p>{movie.getTitle()}</p>
                        <Tooltip title={favorite ? "Remove from favorites" : "Add to favorites"}>
                            {favorite ?
                                <StarFilled onClick={(e) => handleFavorite({movie: movie, state: false, e:e})}/> :
                                <StarOutlined onClick={(e) => handleFavorite({movie: movie, state: true, e:e})}/>
                            }
                        </Tooltip>
                    </>
                }
            </div>
        </Link>
    )
}

export default MovieCard;