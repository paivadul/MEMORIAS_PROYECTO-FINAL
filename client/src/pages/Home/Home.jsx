import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Home.css';
import axios from 'axios';

export const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Simular una llamada al backend para obtener las imágenes
        const fetchImages = async () => {
            // Reemplaza esta URL con la llamada a tu backend
            const response = await axios.get('http://localhost:8060/api/anecdota/all');
            console.log(response.data);
            setData(response.data);
        };

        fetchImages();
    }, []);

    return (
        <>
            <div id="home-component">
                <div id="home-carousel-container">
                    <Carousel infiniteLoop autoPlay animationHandler={'slide'} interval={3000} thumbWidth={'200px'} width={'1000px'}
                        heigth={'500px'}>
                        {data && data?.map((data, index) => (
                            <div key={index} className="home-carousel-slide">
                                <img src={`http://localhost:8060/static/${data.media}`} alt={data.titulo} className="home-carousel-image" />
                                <p className='legend'>{data.titulo}</p>
                            </div>
                        ))}
                        {/* {data && data.map((data, index) => (
                            <div key={index} className="home-carousel-slide">
                            <img src={`http://localhost:8060/static/${data.media}`} alt={data.titulo}  className="home-carousel-image" />
                            </div>
                        ))}*/}
                    </Carousel>
                </div>
            </div>
        </>

    );
};
