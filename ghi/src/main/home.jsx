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
import featured_plants from '../public/featured_plants.svg'
import FeaturedPlantImages from './featured_plants';
import greenhouse from '../public/greenhouse.svg'



const sections = [

];

const mainFeaturedPost = {
  title: '',
  description:
    "",
  image: featured_plants,
  imageText: 'Featured Collections',
  linkText: '',
};

const featuredPosts = [
  {
    title: 'Greenhouse',
    description:
      'Enter your Greenhouse and take a wiff!',
    image: greenhouse,
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
          <MainFeaturedPost post={mainFeaturedPost} className='featured_collections'/>
          <div className='plant_img_container'>
            <h3 className='featured_plants_title'>
              Featured Plants
            </h3>
            <FeaturedPlantImages className='featured_plants' />
          </div>
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
