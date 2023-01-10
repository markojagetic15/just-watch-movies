import MovieBuilder from "./MovieBuilder";
import { Movie } from "../Domain/Interface/MovieInterface";
import BaseService from "../../../Common/BaseService";
const API_KEY = process.env.REACT_APP_API_KEY;

class SearchRepository extends BaseService {
    movieBuilder: MovieBuilder;

    constructor() {
        super();
        this.movieBuilder = new MovieBuilder();
    }

    async fetchSearchedQuery(query: string) {
        try {
            const response = await this.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
            return response.data.results.map((model: Movie) => this.movieBuilder.fromRawJson(model));
        } catch (error) {
            return error;
        }
    }
}

export default SearchRepository;