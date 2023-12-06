import React from 'react';
import './home.css';

const Homepage = () => {
  // Sample data for content cards
  const contentData = [
    { id: 1, imageUrl: 'https://placekitten.com/300/200', title: 'Cute Kitten 1' },
    { id: 2, imageUrl: 'https://placekitten.com/300/250', title: 'Cute Kitten 2' },
    { id: 3, imageUrl: 'https://placekitten.com/300/220', title: 'Cute Kitten 3' },
    // Add more data as needed
  ];

  return (
    <div className="homepage">
      {contentData.map((item) => (
        <div key={item.id} className="content-card">
          <img src={item.imageUrl} alt={item.title} />
          <h3>{item.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Homepage;