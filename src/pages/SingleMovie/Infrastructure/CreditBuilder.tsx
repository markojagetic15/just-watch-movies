import Credit from "../Domain/Entity/Credit"

class CreditBuilder {
    fromRawJson({
                    id,
                    cast,
                    crew
                }: { id: number, cast: object[], crew: object[] }) {
        return new Credit(
            {
                id: id,
                cast: cast,
                crew: crew
            },
        )
    }
}

export default CreditBuilder;
