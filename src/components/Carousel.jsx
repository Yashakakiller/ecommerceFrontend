import React, { useState, useEffect } from 'react';
import i2 from '../../public/shoes ecommerce.jpg';
import i3 from '../../public/b2.jpg';
import i4 from '../../public/b3.jpg';
import i5 from '../../public/b4.jpg';

export default function Carousel() {
  const bannerImages = [ i2,i3,i4,i5]; 

  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setCurrentImage(bannerImages[index]);
      index = (index + 1) % bannerImages.length;
    }, 3000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <>
      <section id="hero">
        <img src={currentImage} alt="Banner" disabled/>
      </section>
    </>
  );
}
