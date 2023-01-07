import Movie from "../Domain/Entity/Movie"

class MovieBuilder {
    fromRawJson({
                    adult,
                    backdrop_path,
                    belongs_to_collection,
                    budget,
                    genres,
                    homepage,
                    id,
                    imdb_id,
                    original_language,
                    original_title,
                    overview,
                    popularity,
                    poster_path,
                    production_companies,
                    production_countries,
                    release_date,
                    revenue,
                    runtime,
                    spoken_languages,
                    status,
                    tagline,
                    title,
                    video,
                    vote_average,
                    vote_count
                }: {
        adult: boolean,
        backdrop_path: string,
        belongs_to_collection: object,
        budget: number,
        genres: number[],
        homepage: string,
        id: number,
        imdb_id: string,
        original_language: string,
        original_title: string,
        overview: string,
        popularity: number,
        poster_path: string,
        production_companies: object[],
        production_countries: string[]
        release_date: string,
        revenue: number,
        runtime: number,
        spoken_languages: string[],
        status: string,
        tagline: string,
        title: string,
        video: boolean,
        vote_average: number,
        vote_count: number
    }) {
        return new Movie(
            {
                adult: adult,
                backdrop_path: backdrop_path,
                belongs_to_collection: belongs_to_collection,
                budget: budget,
                genres: genres,
                homepage: homepage,
                id: id,
                imdb_id: imdb_id,
                original_language: original_language,
                original_title: original_title,
                overview: overview,
                popularity: popularity,
                poster_path: poster_path,
                production_companies: production_companies,
                production_countries: production_countries,
                release_date: release_date,
                revenue: revenue,
                runtime: runtime,
                spoken_languages: spoken_languages,
                status: status,
                tagline: tagline,
                title: title,
                video: video,
                vote_average: vote_average,
                vote_count: vote_count
            },
        )
    }
}

export default MovieBuilder;
