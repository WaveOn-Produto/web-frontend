"use client";

import { useState } from 'react';

function imageSrc(image: string) {
  if (!image) return 'https://placehold.co/600x600/f8f8f8/ccc?text=Produto';
  if (image.startsWith('http')) return image; 
  return `/images/produtos/${image}.svg`;
}

function sealSrc(seal: string) {
  if (!seal) return '';
  return `/images/lojas/${seal}.svg`;
}

type ProductGalleryProps = {
  images: string[];
  seal: string;
  productName: string;
};

export default function ProductGallery({ images, seal, productName }: ProductGalleryProps) {
  
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleThumbnailClick = (imageSlug: string) => {
    setSelectedImage(imageSlug);
  };

  return (
    <section className="prod-gallery">
      
      <div className="prod-gallery__thumbnails">
        {images.map((imgSlug, index) => (
          <button 
            key={index} 
            className={`thumbnail-btn ${imgSlug === selectedImage ? 'active' : ''}`}
            onClick={() => handleThumbnailClick(imgSlug)}
          >
            <img 
              src={imageSrc(imgSlug)} 
              alt={`Thumbnail ${index + 1}`} 
            />
          </button>
        ))}
      </div>

      <div className="prod-gallery__main-image">
        <img 
          className="prod-gallery__seal" 
          src={sealSrc(seal)} 
          alt={`Selo ${seal}`} 
        />
        <img 
          className="prod-gallery__product-image" 
          src={imageSrc(selectedImage)} 
          alt={productName} 
        />
      </div>
    </section>
  );
}