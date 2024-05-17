import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Home.css';
import axios from 'axios';

export const Home = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Simular una llamada al backend para obtener las imágenes
        const fetchImages = async () => {
            // Reemplaza esta URL con la llamada a tu backend
            const response = await axios.get('http://localhost:8060/api/anecdota/all');
            console.log(response);
            setImages(response.data.anecdotas);
        };

        fetchImages();
    }, []);

    return (
        <div id="home-component">
            <div id="home-carousel-container">
                <Carousel>
                    {images ?? images?.map((image, index) => (
                        <div key={index} className="home-carousel-slide">
                            <img src={image.url} alt={image.alt} className="home-carousel-image" />
                        </div>
                    ))}
                </Carousel>
            </div>


        </div>

    );
};
