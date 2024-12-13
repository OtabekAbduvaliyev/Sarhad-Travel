import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Sample data - In a real app, this would come from an API
const travelersData = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd",
        name: "Otabek Rahimov",
        destination: "Maldives",
        rating: 5.0,
        review: "Paradise found! Crystal clear waters and the most peaceful vacation ever. The overwater bungalows are a dream come true.",
        date: "September 2023",
        likes: 423
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1519055548599-6d4d129508c4",
        name: "Shoxjahon Tursunov",
        destination: "Barcelona, Spain",
        rating: 4.8,
        review: "The architecture, the food, the culture - everything was incredible! Gaudi's works are even more stunning in person.",
        date: "October 2023",
        likes: 356
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9",
        name: "O'tkir Alimov",
        destination: "Venice, Italy",
        rating: 4.9,
        review: "A romantic city that feels like stepping into a painting. The gondola rides and historic architecture are unforgettable!",
        date: "November 2023",
        likes: 278
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60",
        name: "Dilshod Karimov",
        destination: "Santorini, Greece",
        rating: 4.8,
        review: "An absolutely magical experience! The sunsets were breathtaking and the local hospitality was amazing.",
        date: "June 2023",
        likes: 245
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee",
        name: "Jamshid Nurmatov",
        destination: "Paris, France",
        rating: 4.9,
        review: "The city of lights exceeded all expectations. Every corner had something beautiful to discover.",
        date: "July 2023",
        likes: 189
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd",
        name: "Sardor Umarov",
        destination: "Tokyo, Japan",
        rating: 4.7,
        review: "A perfect blend of tradition and modernity. The food scene is incredible!",
        date: "August 2023",
        likes: 312
    }
];

const PlaceGallery = () => {
    const { t } = useTranslation();
    const [selectedTraveler, setSelectedTraveler] = useState(null);
    const [likedPhotos, setLikedPhotos] = useState(new Set());

    const toggleLike = (id, e) => {
        e.stopPropagation();
        setLikedPhotos(prev => {
            const newLiked = new Set(prev);
            if (newLiked.has(id)) {
                newLiked.delete(id);
            } else {
                newLiked.add(id);
            }
            return newLiked;
        });
    };

    return (
        <section id="places" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
            {/* Header */}
            <div className="max-w-7xl mx-auto text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                >
                    {t('placeGallery.header.title')}
                </motion.h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    {t('placeGallery.header.description')}
                </p>
            </div>

            {/* Gallery Grid */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {travelersData.map((traveler) => (
                        <motion.div
                            key={traveler.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setSelectedTraveler(traveler)}
                            className="cursor-pointer h-full"
                        >
                            <div className="relative group rounded-xl overflow-hidden shadow-lg bg-white h-[300px]">
                                <div className="w-full h-full">
                                    <img
                                        src={traveler.image}
                                        alt={traveler.destination}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <button
                                    onClick={(e) => toggleLike(traveler.id, e)}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                                >
                                    {likedPhotos.has(traveler.id) ? (
                                        <FaHeart className="text-red-500 w-5 h-5" />
                                    ) : (
                                        <FaRegHeart className="text-gray-600 w-5 h-5" />
                                    )}
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                    <h3 className="text-white font-semibold text-lg">
                                        {traveler.destination}
                                    </h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal for selected traveler */}
            <AnimatePresence>
                {selectedTraveler && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedTraveler(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full mx-4 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="relative h-96 md:h-full">
                                    <img
                                        src={selectedTraveler.image}
                                        alt={selectedTraveler.destination}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                                {selectedTraveler.destination}
                                            </h3>
                                            <p className="text-gray-600">
                                                {selectedTraveler.name} • {selectedTraveler.date}
                                            </p>
                                        </div>
                                        <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                                            <FaStar className="text-yellow-400 mr-1" />
                                            <span className="font-medium">{selectedTraveler.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                        {selectedTraveler.review}
                                    </p>
                                    <div className="flex items-center justify-between text-gray-600">
                                        <span>{selectedTraveler.likes} likes</span>
                                        <button
                                            onClick={() => toggleLike(selectedTraveler.id)}
                                            className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                                        >
                                            {likedPhotos.has(selectedTraveler.id) ? (
                                                <FaHeart className="text-red-500" />
                                            ) : (
                                                <FaRegHeart />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default PlaceGallery;
