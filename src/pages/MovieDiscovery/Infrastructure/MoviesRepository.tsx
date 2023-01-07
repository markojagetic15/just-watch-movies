import axios from "axios";
import MovieBuilder from "./MovieBuilder";
import GenreBuilder from "./GenreBuilder";
import { Genre } from "../Domain/Interface/GenreInterface";
import { Movie } from "../Domain/Interface/MovieInterface";
const API_KEY = process.env.API_KEY;

class MoviesRepository  {
    movieBuilder: MovieBuilder;
    genreBuilder: GenreBuilder;

    constructor() {
        this.movieBuilder = new MovieBuilder();
        this.genreBuilder = new GenreBuilder()
    }

    async fetchMovies(sortBy: string, genre: string) {
        const params = new URLSearchParams();

        if (sortBy !== "") {
            params.set("sort_by", sortBy);
        }

        if (genre !== "") {
            params.set("with_genres", genre);
        }

        try {
            const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&${params.toString()}`)

            return response.data.results.map((model: Movie) => this.movieBuilder.fromRawJson(model));
        } catch (e) {
            return [];
        }
    }

    async fetchMovieGenres() {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);

            return response.data.genres.map((model: Genre) => this.genreBuilder.fromRawJson(model));
        } catch (e) {
            return [];
        }
    }

    async fetchSimilarMovies(id: number) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`);
            return response.data.results.map((model: Movie) => this.movieBuilder.fromRawJson(model));
        } catch (e) {
            return []
        }
    }
}

export default MoviesRepository;