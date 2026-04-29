import React from 'react';
import { Row, Col, Dropdown, Space, Button } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Outlet, Link } from 'react-router-dom';
import SearchComponent from './Search/Application/SearchComponent';
import MovieRepository from '../pages/SingleMovie/Infrastructure/MovieRepository';
import Logo from './Logo';

const movieRepository = new MovieRepository();

const items: MenuProps['items'] = localStorage.getItem('favorites')
  ? movieRepository.fetchFavorites()
  : [{ key: null, label: "Favorite a movie and it'll show up here" }];

const Navigation = () => {
  return (
    <>
      <Row className="navigation" align="middle">
        <Col lg={12} xs={12}>
          <Link to="/" className="nav-logo-link">
            <Logo />
          </Link>
        </Col>
        <Col lg={12} xs={12}>
          <div className="nav-right">
            <Space size={28} align="center">
              <Link to="discover-movies">
                <Button className="nav-discover-btn">Discover</Button>
              </Link>
              <SearchComponent />
              <Dropdown menu={{ items }} placement="bottomRight">
                <Link onClick={(e) => e.preventDefault()} to="" className="nav-favorites-link">
                  <Space>
                    My favorites
                    <DownOutlined />
                  </Space>
                </Link>
              </Dropdown>
            </Space>
          </div>
        </Col>
      </Row>
      <Outlet />
    </>
  );
};

export default Navigation;
