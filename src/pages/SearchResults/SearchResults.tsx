import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import SearchRepository from "../../components/Search/Infrastructure/SearchRepository";
import {Row, Col, notification} from 'antd';
import { Link } from "react-router-dom";
import {BarChartOutlined, LoadingOutlined} from "@ant-design/icons";
import AssetManager from "../../helpers/AssetManager";
import Movie from "../MovieDiscovery/Domain/Entity/Movie";

const searchRepository = new SearchRepository();

const SearchResults = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [results, setResults] = useState<Movie[] | null>(null)
    const params = useParams();

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                let searchResults = await searchRepository.fetchSearchedQuery(params.query);
                setResults(searchResults);
            } catch (error) {
                notification["error"]({
                    message: error,
                    duration: 4,
                });
            }
        }

        setIsLoading(true);
        fetchSearchResults().then(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        });
    }, [params]);

    if(isLoading) {
        return (
            <div className="loader-holder">
                <LoadingOutlined className="loader"/>
            </div>
        )
    }

    return (
        <div className="search-results">
            <div className="container">
                <h1>Search results for "{params.query}"</h1>
                <div>
                    {results?.map((result) =>
                        <Row className="movie">
                            <Col lg={4}>
                                <Link to={`/movie/${result.getId()}`}>
                                    <img src={result.getPosterPath() ? `https://image.tmdb.org/t/p/w500${result.getPosterPath()}` : AssetManager.getUrl("placeholder.png")} alt={`${result.getTitle()}`}/>
                                </Link>
                            </Col>
                            <Col lg={10}>
                                <h1>{result.getTitle()} <p>({result.getReleaseDate()?.split("-")[0]})</p></h1>
                                <p>{result.getOverview()}</p>
                                <h1>{result.getVoteAverage()} <BarChartOutlined /></h1>
                            </Col>
                        </Row>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchResults;