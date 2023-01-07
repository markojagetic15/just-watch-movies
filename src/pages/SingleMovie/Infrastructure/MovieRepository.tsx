import axios from "axios";
import MovieBuilder from "./MovieBuilder";
import CreditBuilder from "./CreditBuilder";
const API_KEY = process.env.REACT_APP_API_KEY;

class MoviesRepository  {
    movieBuilder: MovieBuilder;
    creditBuilder: CreditBuilder;

    constructor() {
        this.movieBuilder = new MovieBuilder();
        this.creditBuilder = new CreditBuilder();
    }

    async fetchMovieById(id: number) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
            return this.movieBuilder.fromRawJson(response.data);
        } catch (error) {
            return error;
        }
    }

    async fetchMovieCredits(id: number) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
            return this.creditBuilder.fromRawJson(response.data);
        } catch (error) {
            return error;
        }
    }

    async fetchMovieImages(id: number) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY}`);
            return response.data;
        } catch (error) {
            return error;
        }
    }
}

export default MoviesRepository;