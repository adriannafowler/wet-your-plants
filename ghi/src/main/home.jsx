import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Homepage = () => {
  // Plant data for content cards to match the design mockup
  const contentData = [
    // ... your content data
  ];

  return (
    <>
      <div className="header">
        <h1 className="title">Home Page</h1>
        <Link to="/signin" className="sign-in-button">Sign In</Link>
      </div>
      <div className="homepage">
        {contentData.map((item) => (
          <div key={item.id} className="content-card">
            <img src={item.imageUrl} alt={item.title} />
            <div className="card-content">
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Homepage;