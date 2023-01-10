import React from 'react';
import AssetManager from "../helpers/AssetManager";
import { Row, Col, Dropdown, Space, Button } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Outlet, Link } from "react-router-dom";
import SearchComponent from "./Search/Application/SearchComponent";
import MovieRepository from "../pages/SingleMovie/Infrastructure/MovieRepository";

const movieRepository = new MovieRepository();

const items: MenuProps['items'] = localStorage.getItem("favorites") ? movieRepository.fetchFavorites() : [{key: null, label: "Favorite a movie and it'll show up here"}];

const  Navigation = () => {
    return (
        <>
            <Row className="navigation" style={{alignItems: "center", zIndex: "100"}}>
                <Col lg={12}>
                    <Link to="/">
                        <img src={AssetManager.getUrl("logo.png")} alt="logo" style={{ height: 120 }} />
                    </Link>
                </Col>
                <Col lg={12}>
                    <Row>
                        <Space size="large">
                            <Col>
                                <Link to="discover-movies">
                                    <Button>
                                        Discover
                                    </Button>
                                </Link>
                            </Col>
                            <Col>
                                <SearchComponent />
                            </Col>
                            <Col>
                                <Dropdown menu={{ items }} placement="bottomRight">
                                    <Link onClick={(e) => e.preventDefault()} to="">
                                        <Space style={{color: "#fff"}}>
                                            My favorites
                                            <DownOutlined />
                                        </Space>
                                    </Link>
                                </Dropdown>
                            </Col>
                        </Space>
                    </Row>
                </Col>
            </Row>
            <Outlet />
        </>
    );
}

export default Navigation;
