import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiDayCloudyGusts, WiHumidity, WiThermometer, WiStrongWind, WiSunrise, WiSunset } from 'react-icons/wi';
import { FaMapMarkerAlt, FaCalendarAlt, FaCompass } from 'react-icons/fa';
import { RiCompassDiscoverLine } from 'react-icons/ri';

const destinations = [
    {
        id: 1,
        name: "Maldives",
        current: {
            temp: 29,
            condition: "sunny",
            humidity: 75,
            wind: 12,
            sunrise: "6:15 AM",
            sunset: "6:45 PM"
        },
        forecast: [
            { day: "Mon", temp: 29, condition: "sunny" },
            { day: "Tue", temp: 28, condition: "cloudy" },
            { day: "Wed", temp: 28, condition: "rain" },
            { day: "Thu", temp: 29, condition: "sunny" },
            { day: "Fri", temp: 28, condition: "cloudy" }
        ],
        gradient: "from-blue-200 to-cyan-300",
        bestTime: "Nov - Apr",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1470&auto=format&fit=crop",
        description: "Crystal clear waters and pristine beaches with year-round tropical weather."
    },
    {
        id: 2,
        name: "Swiss Alps",
        current: {
            temp: -2,
            condition: "snow",
            humidity: 85,
            wind: 20,
            sunrise: "7:30 AM",
            sunset: "4:45 PM"
        },
        forecast: [
            { day: "Mon", temp: -2, condition: "snow" },
            { day: "Tue", temp: -1, condition: "cloudy" },
            { day: "Wed", temp: -3, condition: "snow" },
            { day: "Thu", temp: -2, condition: "cloudy" },
            { day: "Fri", temp: -4, condition: "snow" }
        ],
        gradient: "from-indigo-200 to-purple-300",
        bestTime: "Dec - Mar",
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1470&auto=format&fit=crop",
        description: "Majestic snow-capped peaks perfect for winter sports and alpine adventures."
    },
    {
        id: 3,
        name: "Dubai",
        current: {
            temp: 35,
            condition: "sunny",
            humidity: 45,
            wind: 15,
            sunrise: "5:45 AM",
            sunset: "7:15 PM"
        },
        forecast: [
            { day: "Mon", temp: 35, condition: "sunny" },
            { day: "Tue", temp: 36, condition: "sunny" },
            { day: "Wed", temp: 34, condition: "windy" },
            { day: "Thu", temp: 35, condition: "sunny" },
            { day: "Fri", temp: 33, condition: "cloudy" }
        ],
        gradient: "from-orange-200 to-pink-300",
        bestTime: "Nov - Mar",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1470&auto=format&fit=crop",
        description: "Modern oasis with year-round sunshine and desert adventures."
    }
];

const WeatherIcon = ({ condition, className }) => {
    switch (condition) {
        case 'sunny':
            return <WiDaySunny className={className} />;
        case 'rain':
            return <WiRain className={className} />;
        case 'snow':
            return <WiSnow className={className} />;
        case 'cloudy':
            return <WiCloudy className={className} />;
        case 'windy':
            return <WiDayCloudyGusts className={className} />;
        default:
            return <WiDaySunny className={className} />;
    }
};

const TravelWeather = () => {
    const [selectedDestination, setSelectedDestination] = useState(destinations[0]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleDestinationChange = (destination) => {
        setIsAnimating(true);
        setTimeout(() => {
            setSelectedDestination(destination);
            setIsAnimating(false);
        }, 300);
    };

    return (
        <div className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-800">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-full h-full">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-gray-300/20 backdrop-blur-sm"
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                        Weather Guide
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover the perfect weather for your next adventure
                    </p>
                </motion.div>

                {/* Destination Selector */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {destinations.map((destination) => (
                        <motion.button
                            key={destination.id}
                            onClick={() => handleDestinationChange(destination)}
                            className={`px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-md relative overflow-hidden shadow-md ${
                                selectedDestination.id === destination.id
                                    ? 'ring-2 ring-gray-500'
                                    : 'hover:ring-2 hover:ring-gray-300'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-r ${destination.gradient} opacity-20`} />
                            <span className="relative z-10">{destination.name}</span>
                        </motion.button>
                    ))}
                </div>

                {/* Weather Display */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedDestination.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                    >
                        {/* Current Weather */}
                        <div className="relative rounded-3xl overflow-hidden group shadow-lg">
                            <div className="absolute inset-0">
                                <motion.img
                                    src={selectedDestination.image}
                                    alt={selectedDestination.name}
                                    className="w-full h-full object-cover"
                                    initial={{ scale: 1 }}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.4 }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-200/90 via-gray-100/50 to-transparent" />
                            </div>

                            <div className="relative p-8 h-full flex flex-col justify-between">
                                <div>
                                    <h3 className="text-3xl font-bold mb-2">{selectedDestination.name}</h3>
                                    <p className="text-gray-600 mb-6">{selectedDestination.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="flex items-center space-x-4">
                                        <WeatherIcon
                                            condition={selectedDestination.current.condition}
                                            className="w-16 h-16 text-gray-700"
                                        />
                                        <div>
                                            <div className="text-4xl font-bold">{selectedDestination.current.temp}°C</div>
                                            <div className="text-gray-600 capitalize">{selectedDestination.current.condition}</div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <WiSunrise className="w-6 h-6 text-gray-700" />
                                            <span>{selectedDestination.current.sunrise}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <WiSunset className="w-6 h-6 text-gray-700" />
                                            <span>{selectedDestination.current.sunset}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mt-6">
                                    <div className="bg-white/80 rounded-xl p-4 shadow backdrop-blur-sm">
                                        <WiHumidity className="w-8 h-8 mb-2 text-gray-700" />
                                        <div className="text-sm text-gray-600">Humidity</div>
                                        <div className="text-xl font-semibold">{selectedDestination.current.humidity}%</div>
                                    </div>
                                    <div className="bg-white/80 rounded-xl p-4 shadow backdrop-blur-sm">
                                        <WiStrongWind className="w-8 h-8 mb-2 text-gray-700" />
                                        <div className="text-sm text-gray-600">Wind</div>
                                        <div className="text-xl font-semibold">{selectedDestination.current.wind} km/h</div>
                                    </div>
                                    <div className="bg-white/80 rounded-xl p-4 shadow backdrop-blur-sm">
                                        <FaCalendarAlt className="w-6 h-6 mb-2 text-gray-700" />
                                        <div className="text-sm text-gray-600">Best Time</div>
                                        <div className="text-xl font-semibold">{selectedDestination.bestTime}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Forecast */}
                        <div className="bg-white/80 rounded-3xl p-8 shadow backdrop-blur-sm">
                            <h4 className="text-2xl font-semibold mb-8">5-Day Forecast</h4>
                            <div className="space-y-6">
                                {selectedDestination.forecast.map((day, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-300/30 transition-colors"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 text-gray-600">{day.day}</div>
                                            <WeatherIcon condition={day.condition} className="w-8 h-8 text-gray-700" />
                                            <div className="capitalize text-gray-600">{day.condition}</div>
                                        </div>
                                        <div className="text-xl font-semibold">{day.temp}°C</div>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 shadow backdrop-blur-sm"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-center space-x-2 mb-2">
                                    <RiCompassDiscoverLine className="w-5 h-5 text-blue-500" />
                                    <span className="text-blue-500">Travel Tip</span>
                                </div>
                                <p className="text-gray-600">
                                    Best time to visit {selectedDestination.name} is during {selectedDestination.bestTime} 
                                    when the weather is perfect for outdoor activities.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TravelWeather;
