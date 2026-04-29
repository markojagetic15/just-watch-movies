import React, { useState } from 'react';
import { SearchOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Input, Dropdown, Space, notification } from 'antd';
import SearchRepository from '../Infrastructure/SearchRepository';
import { Link } from 'react-router-dom';
import Debouncer from '../../../helpers/Debouncer';
import AssetManager from '../../../helpers/AssetManager';

const searchRepository = new SearchRepository();

const SearchComponent = () => {
  const [items, setItems] = useState<{ key: string; label: any }[]>([
    { key: '0', label: <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>Search for movies…</span> },
  ]);

  let searchForMovie = async (query: string) => {
    try {
      let searchResults = await searchRepository.fetchSearchedQuery(query);

      searchResults.map((result: any, index: number) => {
        result['key'] = index;
        result['label'] = (
          <Link to={`/movie/${result.getId()}`} className="search-item">
            <img
              src={
                result.getPosterPath()
                  ? `https://image.tmdb.org/t/p/w92${result.getPosterPath()}`
                  : AssetManager.getUrl('placeholder.png')
              }
              alt={result.getTitle()}
            />
            <div className="search-item-info">
              <span className="search-item-title">{result.getTitle()}</span>
              <span className="search-item-year">{result?.getReleaseDate()?.split('-')[0]}</span>
            </div>
          </Link>
        );
      });

      if (searchResults.length === 0) {
        setItems([{ key: '0', label: <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>No results found</span> }]);
      } else {
        searchResults = searchResults.slice(0, 6);
        searchResults.push({
          key: String(searchResults.length),
          label: (
            <Link to={`search-results/${query}`} style={{ color: '#FBC500', fontSize: '0.85rem' }}>
              See all results
            </Link>
          ),
          icon: <ArrowRightOutlined style={{ color: '#FBC500' }} />,
        });
        setItems(searchResults);
      }

      if (query === '') {
        setItems([{ key: '0', label: <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>Search for movies…</span> }]);
      }
    } catch (error) {
      notification['error']({ message: String(error), duration: 4 });
    }
  };

  // @ts-ignore
  searchForMovie = Debouncer.debounce(searchForMovie, 300);

  return (
    <div>
      <Dropdown menu={{ items }} placement="bottom" trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Input
              placeholder="Search movies…"
              prefix={<SearchOutlined style={{ color: 'rgba(255,255,255,0.35)' }} />}
              onChange={(e) => searchForMovie(e.target.value)}
            />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default SearchComponent;
