"use client";
import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

interface PropertyImage {
  id: number;
  description: string;
  property_image: string;
}

interface PropertyImageCarouselProps {
  property: {
    name: string;
    address: string;
    city: string;
    state: string;
    property_pictures: PropertyImage[];
  };
}

const PropertyImageCarousel = ({ property }: PropertyImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<PropertyImage | null>(null);

  // Use actual property images or fallback to empty array
  const images = property?.property_pictures || [];

  const nextImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const openModal = (image: PropertyImage) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="relative w-full">
      {/* Property Address Display */}
      <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{property.name}</h3>
        <p className="text-gray-600 dark:text-gray-300">
          {property.address}, {property.city}, {property.state}
        </p>
      </div>

      {/* Main Carousel */}
      {images.length > 0 ? (
        <>
          <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
            <img
              src={images[currentIndex].property_image}
              alt={images[currentIndex].description || 'Property image'}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => openModal(images[currentIndex])}
            />

            {images.length > 1 && (
              <>
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
              </>
            )}

            {/* Image caption */}
            {images[currentIndex].description && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                {images[currentIndex].description}
              </div>
            )}

            {/* Navigation dots */}
            {images.length > 1 && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 w-2 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {images.map((image, index) => (
                <div 
                  key={image.id}
                  className={`relative h-20 cursor-pointer overflow-hidden rounded-lg ${currentIndex === index ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <img
                    src={image.property_image}
                    alt={image.description || `Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {image.description && (
                    <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                      {image.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="h-64 md:h-80 lg:h-96 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">No images available</p>
        </div>
      )}

      {/* Image Modal */}
      {showModal && selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative max-w-4xl w-full">
            <img
              src={selectedImage.property_image}
              alt={selectedImage.description || 'Property image'}
              className="w-full max-h-[80vh] object-contain"
            />
            {selectedImage.description && (
              <div className="absolute top-4 left-4 bg-black/70 text-white p-2 rounded">
                {selectedImage.description}
              </div>
            )}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-black/70 text-white p-2 rounded-full hover:bg-black"
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