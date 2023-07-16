import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_CALL } from '../api';

export default function Carousel() {
  const [bannerImages, setBannerImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setCurrentImage(bannerImages[index]);
      index = (index + 1) % bannerImages.length;
    }, 3000);

    return () => clearInterval(interval);
  }, [bannerImages]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_CALL}/banner`);
        const images = response.data.bannerImages.map((banner) => banner.bannerImage);
        setBannerImages(images);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section id="hero">
        {currentImage && <img src={currentImage} alt="Banner" disabled />}
      </section>
    </>
  );
}
