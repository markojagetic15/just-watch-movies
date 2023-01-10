import Movie from "../Domain/Entity/Movie"

class MovieBuilder {
    fromRawJson({
                    adult,
                    backdrop_path,
                    genre_ids,
                    id,
                    original_language,
                    original_title,
                    overview,
                    popularity,
                    poster_path,
                    release_date,
                    title,
                    video,
                    vote_average,
                    vote_count
                }: { adult: boolean, backdrop_path: string, genre_ids: number[], id: number, original_language: string, original_title: string, overview: string, popularity: number, poster_path: string, release_date: string, title: string, video: boolean, vote_average: number, vote_count: number}) {
        return new Movie(
            {
                adult: adult,
                backdrop_path: backdrop_path,
                genre_ids: genre_ids,
                id: id,
                original_language: original_language,
                original_title: original_title,
                overview: overview,
                popularity: popularity,
                poster_path: poster_path,
                release_date: release_date,
                title: title,
                video: video,
                vote_average: vote_average,
                vote_count: vote_count
            },
        )
    }
}

export default MovieBuilder;
