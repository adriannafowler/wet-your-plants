import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './header';
import MainFeaturedPost from './mainfeaturedpost';
import FeaturedPost from './featuredpost';
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
  },
  {
    title: 'Plant Care',
    description:
      'Please water your plants',
    image: 'https://source.unsplash.com/random?plants',
    imageLabel: 'Image Text',
  },
];

const posts = [];

const defaultTheme = createTheme();

export default function Blog() {
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