import MovieBuilder from "./MovieBuilder";
import CreditBuilder from "./CreditBuilder";
import BaseService from "../../../Common/BaseService";
const API_KEY = process.env.REACT_APP_API_KEY;

class MoviesRepository extends BaseService  {
    movieBuilder: MovieBuilder;
    creditBuilder: CreditBuilder;

    constructor() {
        super();
        this.movieBuilder = new MovieBuilder();
        this.creditBuilder = new CreditBuilder();
    }

    async fetchMovieById(id: number) {
        try {
            const response = await this.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
            return this.movieBuilder.fromRawJson(response.data);
        } catch (error) {
            return error;
        }
    }

    async fetchMovieCredits(id: number) {
        try {
            const response = await this.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
            return this.creditBuilder.fromRawJson(response.data);
        } catch (error) {
            return error;
        }
    }

    async fetchMovieImages(id: number) {
        try {
            const response = await this.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY}`);
            return response.data;
        } catch (error) {
            return error;
        }
    }

    fetchFavorites() {
        try {
            return JSON.parse(localStorage.getItem("favorites"));
        } catch (e) {
            return [];
        }
    }

    setFavorites(data: object) {
        try {
            localStorage.setItem("favorites", JSON.stringify(data));
            return {};
        } catch (e) {
            return [];
        }
    }
}

export default MoviesRepository;