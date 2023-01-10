import React, { useState } from 'react';
import { SearchOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Input, Dropdown, Space, notification } from "antd";
import SearchRepository from "../Infrastructure/SearchRepository";
import { Link } from "react-router-dom";
import Debouncer from "../../../helpers/Debouncer";
import AssetManager from "../../../helpers/AssetManager";

const searchRepository = new SearchRepository();

const SearchComponent = () => {
    const [items, setItems] = useState<{key: string, label: string}[]>([{key: "0", label: "Search for movies"}]);

    let searchForMovie = async (query: string) => {
        try {
            let searchResults = await searchRepository.fetchSearchedQuery(query);

            // Setting searching results as dropdown items
            searchResults.map((result: any, index: number) => {
                result['key'] = index;
                result['label'] = (
                    <Link to={`/movie/${result.getId()}`} className="search-item">
                        <img src={result.getPosterPath() ? `https://image.tmdb.org/t/p/w500${result.getPosterPath()}` : AssetManager.getUrl("placeholder.png")} alt={`${result.getTitle()}`}/>
                        <h1>{result.getTitle()} <span>({result?.getReleaseDate()?.split("-")[0]})</span>
                        </h1>
                    </Link>
                );
            });


            // If there is no movies available set the message accordingly
            if(searchResults.length === 0) {
                setItems([{key: "0", label: "There are no movies"}]);
            } else {
                // Showing only 6 items in the dropdown and additional link for all search results
                searchResults = searchResults.slice(0, 6);
                searchResults.push({key: (searchResults.length), label: <Link to={`search-results/${query}`}>Check all results for this search</Link>, icon: <ArrowRightOutlined />})
                setItems(searchResults);
            }

            if(query === "") {
                setItems([{key: "0", label: "Search for movies"}])
            }

        } catch (error) {
            // Didn't find any type of documentation for error handling on API so just displaying error this way
            notification["error"]({
                message: error,
                duration: 4,
            });
        }
    }

    // Wait for 300ms when user stops writing to fetch search results
    // TODO Check with Vilim?
    // @ts-ignore
    searchForMovie = Debouncer.debounce(searchForMovie, 300);

    return (
        <div>
            <Dropdown menu={{ items }} placement="bottom" trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <Input placeholder="Search for a movie" prefix={<SearchOutlined />} onChange={(e) => searchForMovie(e.target.value)}/>
                    </Space>
                </a>
            </Dropdown>
        </div>
    )
}

export default SearchComponent

