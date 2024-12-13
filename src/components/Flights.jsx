import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BiWorld } from 'react-icons/bi';
import { FaPlane, FaClock, FaStar, FaUsers } from 'react-icons/fa';

const flightsData = [
    {
        id: 1,
        destination: "dubai",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: "$499",
        duration: "5",
        rating: 4.8,
        reviews: 245,
        availableSeats: 20,
        color: "from-yellow-500 to-orange-500"
    },
    {
        id: 2,
        destination: "maldives",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: "$899",
        duration: "7",
        rating: 4.9,
        reviews: 312,
        availableSeats: 20,
        color: "from-blue-500 to-cyan-500"
    },
    {
        id: 3,
        destination: "bali",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: "$799",
        duration: "6",
        rating: 4.9,
        reviews: 189,
        availableSeats: 20,
        color: "from-emerald-500 to-teal-500"
    },
    {
        id: 4,
        destination: "paris",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: "$699",
        duration: "5",
        rating: 4.7,
        reviews: 276,
        availableSeats: 20,
        color: "from-indigo-500 to-purple-500"
    },
    {
        id: 5,
        destination: "tokyo",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: "$999",
        duration: "8",
        rating: 4.9,
        reviews: 425,
        availableSeats: 15,
        color: "from-pink-500 to-rose-500"
    },
    {
        id: 6,
        destination: "newyork",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: "$799",
        duration: "7",
        rating: 4.8,
        reviews: 356,
        availableSeats: 18,
        color: "from-amber-500 to-red-500"
    },
    {
        id: 7,
        destination: "singapore",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: "$599",
        duration: "6",
        rating: 4.8,
        reviews: 289,
        availableSeats: 22,
        color: "from-green-500 to-emerald-500"
    },
    {
        id: 8,
        destination: "london",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: "$749",
        duration: "6",
        rating: 4.7,
        reviews: 334,
        availableSeats: 16,
        color: "from-violet-500 to-purple-500"
    },
    {
        id: 9,
        destination: "istanbul",
        image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: "$549",
        duration: "5",
        rating: 4.8,
        reviews: 267,
        availableSeats: 25,
        color: "from-red-500 to-orange-500"
    }
];

const Flights = () => {
    const [hoveredId, setHoveredId] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const visibleFlights = showAll ? flightsData : flightsData.slice(0, 6);
    const { t } = useTranslation();

    return (
        <div id="flights" className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-800">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-full h-full">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-gray-200/5"
                            style={{
                                width: Math.random() * 300 + 50,
                                height: Math.random() * 300 + 50,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.1, 0.2, 0.1],
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text">
                        {t('flights.section.title')}
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        {t('flights.section.description')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {visibleFlights.map((flight, index) => (
                        <motion.div
                            key={flight.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative group cursor-pointer"
                        >
                            <Link to={`/flight/${flight.id}`}>
                                <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-lg group transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                                    {/* Background Image */}
                                    <div className="absolute inset-0">
                                        <motion.img
                                            src={flight.image}
                                            alt={t(`flights.destinations.${flight.destination}.name`)}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
                                            initial={{ scale: 1.1 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-colors duration-300 group-hover:from-black/95" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative h-full p-6 flex flex-col justify-between">
                                        {/* Top Content */}
                                        <div className="flex justify-between items-start">
                                            <motion.div
                                                className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${flight.color} flex items-center justify-center shadow-lg`}
                                                initial={{ scale: 1, rotate: 0 }}
                                                whileHover={{ scale: 1.1, rotate: 12 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <FaPlane className="w-6 h-6 text-white" />
                                            </motion.div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-300">
                                                    {t("flights.card.duration")}
                                                </p>
                                                <p className="text-lg font-semibold text-white">
                                                    {flight.duration} {t("flights.card.hours")}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Middle Content */}
                                        <div className="my-6">
                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                {t(`flights.destinations.${flight.destination}.name`)}
                                            </h3>
                                            <p className="text-gray-300 text-sm">
                                                {t(`flights.destinations.${flight.destination}.description`)}
                                            </p>
                                        </div>

                                        {/* Bottom Content */}
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center space-x-2 bg-black/30 px-3 py-1 rounded-full">
                                                    <FaStar className="w-4 h-4 text-yellow-400" />
                                                    <span className="text-white font-medium"> {t("flights.card.reviews", { count: flight.reviews })}</span>
                                                </div>
                                                <div className="bg-black/30 px-3 py-1 rounded-full">
                                                    <span className="text-white font-medium">
                                                        {t("flights.card.availableSeats", { count: flight.availableSeats })}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div className="text-white">
                                                    <p className="text-2xl font-bold">
                                                        {flight.price}
                                                        <span className="text-sm font-normal ml-1">
                                                            {t("flights.card.perPerson")}
                                                        </span>
                                                    </p>
                                                </div>
                                                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl backdrop-blur-sm transition duration-300">
                                                    {t("flights.card.viewDetails")}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {flightsData.length > 6 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mt-12"
                    >
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="bg-gradient-to-r from-orange-500 via-rose-500 to-purple-500 text-white px-8 py-4 rounded-full font-medium  items-center gap-2 transition-all"
                        >
                            {showAll ? t("common.showLess") : t("common.showMore")}
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Flights;
