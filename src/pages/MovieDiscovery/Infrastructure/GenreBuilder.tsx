import Genre from "../Domain/Entity/Genre"

class GenreBuilder {
    fromRawJson({
                    id,
                    name,
                }: { id: number, name: string }) {
        return new Genre(
            {
                id: id,
                name: name,
            },
        )
    }
}

export default GenreBuilder;
