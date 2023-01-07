class Movie {
    private readonly isAdult: boolean;
    private readonly backdropPath: string;
    private readonly genreIds: number[];
    private readonly id: number;
    private readonly originalLanguage: string;
    private readonly originalTitle: string;
    private readonly overview: string;
    private readonly popularity: number;
    private readonly posterPath: string;
    private readonly releaseDate: string;
    private readonly title: string;
    private readonly video: boolean;
    private readonly voteAverage: number;
    private readonly voteCount: number;
    constructor({
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
                }: { adult: boolean, backdrop_path: string, genre_ids: number[], id: number, original_language: string, original_title: string, overview: string, popularity: number, poster_path: string, release_date: string, title: string, video: boolean, vote_average: number, vote_count: number }) {
        this.isAdult = adult;
        this.backdropPath = backdrop_path;
        this.genreIds = genre_ids;
        this.id = id;
        this.originalLanguage = original_language;
        this.originalTitle = original_title;
        this.overview = overview;
        this.popularity = popularity;
        this.posterPath = poster_path;
        this.releaseDate = release_date;
        this.title = title;
        this.video = video;
        this.voteAverage = vote_average;
        this.voteCount = vote_count;
    }

    public getIsAdult(): boolean {
        return this.isAdult;
    }

    public getBackDropPath() : string{
        return this.backdropPath
    }

    public getGenreIds(): number[] {
        return this.genreIds;
    }

    public getId(): number {
        return this.id;
    }

    public getOriginalLanguage(): string {
        return this.originalLanguage;
    }

    public getOriginalTitle(): string {
        return this.originalTitle;
    }

    public getOverview(): string {
        return this.overview;
    }

    public getPopularity(): number {
        return this.popularity;
    }

    public getPosterPath(): string {
        return this.posterPath;
    }

    public getReleaseDate(): string {
        return this.releaseDate;
    }

    public getTitle(): string {
        return this.title;
    }

    public getIsVideo(): boolean {
        return this.video;
    }

    public getVoteAverage(): number {
        return this.voteAverage;
    }

    public getVoteCount(): number {
        return this.voteCount
    }
}

export default Movie;