import React from 'react'
import './home.css'
// import Nav from '/.nav.jsx'

const Homepage = () => {
    // Plant data for content cards to match the design mockup
    const contentData = [
        {
            id: 1,
            imageUrl: 'https://via.placeholder.com/300x200.png?text=Plant+1',
            title: 'Succulent Plant',
        },
        {
            id: 2,
            imageUrl: 'https://via.placeholder.com/300x200.png?text=Plant+2',
            title: 'Fern Plant',
        },
        {
            id: 3,
            imageUrl: 'https://via.placeholder.com/300x200.png?text=Plant+3',
            title: 'Cactus Plant',
        },
        // Add more data as needed
    ]
    // Plant data for content cards to match the design mockup
    const contentData = [
        {
            id: 1,
            imageUrl: 'https://via.placeholder.com/300x200.png?text=Plant+1',
            title: 'Succulent Plant',
        },
        {
            id: 2,
            imageUrl: 'https://via.placeholder.com/300x200.png?text=Plant+2',
            title: 'Fern Plant',
        },
        {
            id: 3,
            imageUrl: 'https://via.placeholder.com/300x200.png?text=Plant+3',
            title: 'Cactus Plant',
        },
        // Add more data as needed
    ]

    return (
        <nav>
            <div className="homepage">
                {contentData.map((item) => (
                    <div key={item.id} className="content-card">
                        <img src={item.imageUrl} alt={item.title} />
                        <div className="card-content">
                            <h3>{item.title}</h3>
                            {/* Add more content elements here if needed */}
                        </div>
                    </div>
                ))}
            </div>
        </nav>
    )
}

export default Homepage
