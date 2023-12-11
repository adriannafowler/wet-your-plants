<<<<<<< HEAD
import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'

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

    return (
        <>
            <div className="header">
                <h1 className="title">Home Page</h1>
                <Link to="/signin" className="sign-in-button">
                    Sign In
                </Link>
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
    )
}

export default Homepage
=======
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './header';
import MainFeaturedPost from './mainfeaturedpost';
import FeaturedPost from './features';
import Main from './main';
import Footer from './footer';
import './background.css'



const sections = [

];

const mainFeaturedPost = {
  title: 'Garden/collections',
  description:
    "Featured Greenhouse!",
  image: 'https://source.unsplash.com/random?plants',
  imageText: 'main image description',
  linkText: 'View More',
};

const featuredPosts = [
  {
    title: 'Featured Plants!',
    description:
      'Featured plants that our planters are proud of!',
    image: 'https://source.unsplash.com/random?plants',
    imageLabel: 'Image Text',
  },
  {
    title: 'Greenhouse',
    description:
      'Enter your Greenhouse and take a wiff!',
    image: 'https://source.unsplash.com/random?plants',
    imageLabel: 'Image Text',
    path: '/greenhouse'
  },
  {
    title: 'Plant Care',
    description:
      'Please water your plants',
    image: 'https://source.unsplash.com/random?plants',
    imageLabel: 'Image Text',
    path: '/PlantCare'
  },
];

const posts = [];

const defaultTheme = createTheme();

export default function HomePage() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Wet Your Plants" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main posts={posts} />
          </Grid>
        </main>
      </Container>
      <Footer
        title="About Us"
        description="Wetting plants since 1999"
      />
    </ThemeProvider>
  );
}
>>>>>>> marketplace
