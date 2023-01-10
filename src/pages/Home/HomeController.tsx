import React, {useEffect, useState} from 'react';
import {Row, Button, Space, Col, notification} from "antd"
import AssetManager from "../../helpers/AssetManager";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const HomeController = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        document.title = 'Welcome to JustWatch';
        setTimeout(() => {
            setIsLoading(false);
        }, 500)
    }, [])

    if(isLoading) {
        return (
            <div className="loader-holder">
                <LoadingOutlined className="loader"/>
            </div>
        )
    }
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
