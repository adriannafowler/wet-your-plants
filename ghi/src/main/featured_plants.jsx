import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import img1 from '../public/plant_images/img1.jpg'
import img2 from '../public/plant_images/img2.jpg'
import img3 from '../public/plant_images/img3.webp'
import img4 from '../public/plant_images/img4.webp'
import img5 from '../public/plant_images/img5.jpg'

export default function FeaturedPlantImages() {
    return (
        <ImageList sx={{ width: '100%', height: 'auto' }} cols={5} rowHeight={164} className='image_list'>
        {itemData.map((item) => (
            <ImageListItem key={item.title} className='list_item'>
            <img
                // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={item.img}
                alt={item.title}
                loading="lazy"
                className='plant_pic'
            />
            </ImageListItem>
        ))}
        </ImageList>
    );
    }

    const itemData = [
    {
        img: img1,
        title: 'featured plant 1',
    },
    {
        img: img3,
        title: 'featured plant 3',
    },
    {
        img: img2,
        title: 'featured plant 2',
    },
    {
        img: img4,
        title: 'featured plant 4',
    },
    {
        img: img5,
        title: 'featured plant 5',
    }
];
