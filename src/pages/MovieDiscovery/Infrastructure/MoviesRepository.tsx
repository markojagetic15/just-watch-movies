import MovieBuilder from "./MovieBuilder";
import GenreBuilder from "./GenreBuilder";
import { Genre } from "../Domain/Interface/GenreInterface";
import { Movie } from "../Domain/Interface/MovieInterface";
import BaseService from "../../../Common/BaseService";
const API_KEY = process.env.REACT_APP_API_KEY;

class MoviesRepository extends BaseService {
    movieBuilder: MovieBuilder;
    genreBuilder: GenreBuilder;

    constructor() {
        super();
        this.movieBuilder = new MovieBuilder();
        this.genreBuilder = new GenreBuilder()
    }

    async fetchMovies(sortBy: string, genre: string, year: string) {
        const params = new URLSearchParams();

        if (sortBy !== "") {
            params.set("sort_by", sortBy);
        }

        if (genre !== "") {
            params.set("with_genres", genre);
        }

        if(year !== "") {
            params.set("year", year);
        }

        try {
            const response = await this.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&${params.toString()}`)
            return response.data.results.map((model: Movie) => this.movieBuilder.fromRawJson(model));
        } catch (e) {
            return [];
        }
    }

    async fetchMovieGenres() {
        try {
            const response = await this.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
            return response.data.genres.map((model: Genre) => this.genreBuilder.fromRawJson(model));
        } catch (e) {
            return [];
        }
    }

    async fetchSimilarMovies(id: number) {
        try {
            const response = await this.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`);
            return response.data.results.map((model: Movie) => this.movieBuilder.fromRawJson(model));
        } catch (e) {
            return []
        }
    }
}

export default MoviesRepository;