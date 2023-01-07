class Movie {
    private readonly isAdult: boolean;
    private readonly backdropPath: string;
    private readonly budget: number;
    private readonly belongsToCollection: object;
    private readonly homepage: string;
    private readonly genres: number[];
    private readonly id: number;
    private readonly imdbId: string;
    private readonly originalLanguage: string;
    private readonly originalTitle: string;
    private readonly overview: string;
    private readonly popularity: number;
    private readonly posterPath: string;
    private readonly productionCompanies: object[];
    private readonly productionCountries: string[];
    private readonly revenue: number;
    private readonly runtime: number;
    private readonly spokenLanguages: string[];
    private readonly status: string;
    private readonly tagline: string;
    private readonly releaseDate: string;
    private readonly title: string;
    private readonly video: boolean;
    private readonly voteAverage: number;
    private readonly voteCount: number;
    constructor({
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
                    revenue,
                    runtime,
                    spoken_languages,
                    status,
                    tagline,
                    release_date,
                    title,
                    video,
                    vote_average,
                    vote_count
                }: { adult: boolean,
                    backdrop_path: string,
                    belongs_to_collection: object,
                    budget: number,
                    genres: number[]
                    homepage: string,
                    id: number,
                    imdb_id: string, original_language: string,
                    original_title: string,
                    overview: string, popularity: number,
                    poster_path: string,
                    production_companies: object[],
                    production_countries: string[],
                    revenue: number,
                    runtime: number,
                    spoken_languages: string[],
                    status: string
                    tagline: string,
                    release_date: string,
                    title: string,
                    video: boolean,
                    vote_average: number,
                    vote_count: number }) {
        this.isAdult = adult;
        this.backdropPath = backdrop_path;
        this.belongsToCollection = belongs_to_collection
        this.budget = budget;
        this.genres = genres;
        this.homepage = homepage;
        this.id = id;
        this.imdbId = imdb_id;
        this.originalLanguage = original_language;
        this.originalTitle = original_title;
        this.overview = overview;
        this.popularity = popularity;
        this.posterPath = poster_path;
        this.productionCompanies = production_companies;
        this.productionCountries = production_countries;
        this.revenue = revenue;
        this.runtime = runtime;
        this.spokenLanguages = spoken_languages;
        this.status = status;
        this.tagline = tagline;
        this.releaseDate = release_date;
        this.title = title;
        this.video = video;
        this.voteAverage = vote_average;
        this.voteCount = vote_count;
    }

    public getIsAdult(): boolean {
        return this.isAdult;
    }

    public getBudget(): number {
        return this.budget;
    }

    public getHomepage(): string {
        return this.homepage;
    }

    public getImdbId(): string {
        return this.imdbId;
    }

    public getProductionCompanies(): object[] {
        return this.productionCompanies;
    }

    public getProductionCountries(): string[] {
        return this.productionCountries;
    }

    public getRevenue(): number {
        return this.revenue;
    }

    public getRuntime(): number {
        return this.runtime;
    }

    public getSpokenLanguages(): string[] {
        return this.spokenLanguages;
    }

    public getStatus(): string {
        return this.status;
    }

    public getTagline(): string {
        return this.tagline
    }

    public getBackDropPath(): string {
        return this.backdropPath;
    }

    public getBelongsToCollection(): object {
        return this.belongsToCollection;
    }

    public getGenreIds(): number[] {
        return this.genres;
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

    public getTitle():string {
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