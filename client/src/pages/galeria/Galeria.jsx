import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

export const Galeria = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8060/api/anecdota/all');
                setData(response.data);
            } catch (error) {
                console.error('Error al obtener las imágenes:', error);
            }
        };

        fetchImages();
    }, []);

    return (
        <Box id="media-component" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 4 }}>
            <Box id="media-carousel-container" sx={{ display: 'flex', flexDirection: 'row', maxWidth: '800px' }}>
                <Box sx={{ flex: 2 }}>
                    <Carousel
                        infiniteLoop
                        autoPlay
                        interval={3000}
                        showThumbs
                        showStatus={false}
                        thumbWidth={100}
                        selectedItem={1}
                        style={{ flex: 1 }}
                        renderThumbs={(children) => children.reverse()}
                    >
                        {data.map((item, index) => (
                            <div key={index} className="media-carousel-slide">
                                <img src={`http://localhost:8060/static/${item.media}`} alt={item.titulo} className="media-carousel-image" style={{ maxWidth: '100%', height: 'auto' }} />
                                <Typography variant="body1" align="center" sx={{ marginTop: 1 }}>{item.titulo}</Typography>
                            </div>
                        ))}
                    </Carousel>
                </Box>
            </Box>
        </Box>
    );
};
