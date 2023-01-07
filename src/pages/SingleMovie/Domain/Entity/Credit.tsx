class Credit {
    private readonly id: number;
    private readonly cast: object[];
    private readonly crew: object[]
    constructor({
                    id,
                    cast,
                    crew
                }: { id: number, cast: object[], crew:  object[]}) {
        this.id = id;
        this.cast = cast;
        this.crew = crew
    }

    public getId(): number {
        return this.id;
    }

    public getCast(): object[] {
        return this.cast;
    }

    public getCrew(): object[] {
        return this.crew;
    }
}

export default Credit;