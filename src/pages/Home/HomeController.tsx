import React from 'react';
import {Row, Button, Space, Col} from "antd"
import AssetManager from "../../helpers/AssetManager";
import { Link } from "react-router-dom";

const HomeController = () => {
    return (
        <>
            <div className="background-holder" style={{ backgroundImage: `url(${AssetManager.getUrl("background.jpeg")})`}}></div>
            <div className="home">
                <div>
                    <Row justify="center">
                        <Col span={14}>
                            <h1>Your streaming guide for movies, TV shows & sports</h1>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col span={14}>
                            <p>Find where to stream new, popular & upcoming entertainment with JustWatch.</p>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col span={14}>
                            <Space size="large">
                                <Link to="discover-movies">
                                    <Button type="primary" size="large">Discover Movies & TV shows</Button>
                                </Link>
                                <Button size="large">Features</Button>
                            </Space>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default HomeController;
