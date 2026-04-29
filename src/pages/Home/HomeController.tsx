import React, { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import AssetManager from '../../helpers/AssetManager';
import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

const HomeController = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    document.title = 'Welcome to JustWatch';
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="loader-holder">
        <LoadingOutlined className="loader" />
      </div>
    );
  }

  return (
    <>
      <div
        className="background-holder"
        style={{ backgroundImage: `url(${AssetManager.getUrl('background.jpeg')})` }}
      />
      <div className="home">
        <div className="home-hero">
          <div className="home-badge">
            <span className="badge-dot" />
            Your streaming guide
          </div>

          <h1>
            Find where to{' '}
            <span className="highlight">stream</span>
            <br />
            anything you love
          </h1>

          <p>
            Discover movies &amp; TV shows across all major platforms.<br />
            One search. Every service.
          </p>

          <div className="home-cta">
            <Link to="discover-movies">
              <Button type="primary" size="large">
                Discover Movies &amp; Shows
              </Button>
            </Link>
            <Button size="large">Learn more</Button>
          </div>

          <div className="home-stats">
            <div className="stat">
              <span className="stat-value">500K+</span>
              <span className="stat-label">Titles</span>
            </div>
            <div className="stat">
              <span className="stat-value">100+</span>
              <span className="stat-label">Services</span>
            </div>
            <div className="stat">
              <span className="stat-value">Free</span>
              <span className="stat-label">Forever</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeController;
