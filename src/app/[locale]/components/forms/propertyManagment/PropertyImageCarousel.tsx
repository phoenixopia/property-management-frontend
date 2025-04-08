"use client";
import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

interface Image {
  id: number;
  url: string;
  caption?: string;
}

const PropertyImageCarousel = () => {
  // Dummy data for images
  const dummyImages: Image[] = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === dummyImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? dummyImages.length - 1 : prevIndex - 1
    );
  };

  const openModal = (image: Image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="relative w-full">
      {/* Main Carousel */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
        {/* Main Image */}
        <img
          src={dummyImages[currentIndex].url}
          alt={dummyImages[currentIndex].caption || 'Property image'}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => openModal(dummyImages[currentIndex])}
        />
        
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
        >
          <FaChevronRight />
        </button>
        
        {/* Image Indicator */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
          {dummyImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>
      
      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {dummyImages.map((image, index) => (
          <div 
            key={image.id}
            className={`relative h-20 cursor-pointer overflow-hidden rounded-lg ${currentIndex === index ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setCurrentIndex(index)}
          >
            <img
              src={image.url}
              alt={image.caption || `Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* Image Modal */}
      {showModal && selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative max-w-4xl w-full">
            <img
              src={selectedImage.url}
              alt={selectedImage.caption || 'Property image'}
              className="w-full max-h-[80vh] object-contain"
            />
    
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-full hover:bg-black"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyImageCarousel;