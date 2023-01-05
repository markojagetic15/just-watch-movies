import React from 'react';
import AssetManager from "../helpers/AssetManager";
import { Input, Row, Col, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Outlet, Link } from "react-router-dom";

const items: MenuProps['items'] = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];

const  Navigation = () => {
    return (
        <>
            <Row className="navigation" style={{alignItems: "center", zIndex: "100"}}>
                <Col lg={18}>
                    <Link to="/">
                        <img src={AssetManager.getUrl("logo.png")} alt="logo" style={{ height: 120 }} />
                    </Link>
                </Col>
                <Col lg={6}>
                    <Row>
                        <Space size="large">
                            <Col>
                                <Input placeholder="Search for a movie" prefix={<SearchOutlined /> }/>
                            </Col>
                            <Col>
                                {/* @ts-ignore */}
                                <Dropdown menu={{ items }}>
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
