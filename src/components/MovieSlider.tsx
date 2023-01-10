import React, { useRef } from "react";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import MovieCard from "./MovieCard";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Genre from "../pages/MovieDiscovery/Domain/Entity/Genre";

const MovieSlider = ({movies, isSingleMovie, genre}: { movies: any[], isSingleMovie: boolean, genre: Genre}) => {
    const slider = useRef(null);

    const settings = {
        speed: 400,
        slidesToShow: isSingleMovie ? 3 : 6,
        slidesToScroll: isSingleMovie ? 1 : 2,
        arrows: false,
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
            <h2>{genre === null ? "Latest movies" : genre?.getName()}</h2>
            <div className="slider">
                <button onClick={() => slider?.current?.slickPrev()} className="prev"><LeftOutlined/></button>
                <Slider {...settings} ref={slider}>
                    {movies.map((movie) => <MovieCard movie={movie} isSingleMovie={isSingleMovie}/>)}
                </Slider>
                <button onClick={() => slider?.current?.slickNext()} className="next"><RightOutlined/></button>
            </div>
        </>
    )
}

export default MovieSlider
