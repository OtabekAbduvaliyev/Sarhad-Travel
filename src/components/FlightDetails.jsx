import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlane, FaClock, FaStar, FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import { sendToTelegram } from '../utils/telegram';

// Import the flights data
const flights = [
    {
        id: 1,
        destination: "dubai",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: "$499",
        duration: "5",
        rating: 4.8,
        reviews: 245,
        availableSeats: 20,
        color: "from-yellow-500 to-orange-500",
        departureDate: "2024-01-15",
        returnDate: "2024-01-20",
        departureCity: "Tashkent"
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
        color: "from-blue-500 to-cyan-500",
        departureDate: "2024-01-20",
        returnDate: "2024-01-27",
        departureCity: "Tashkent"
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
        color: "from-emerald-500 to-teal-500",
        departureDate: "2024-02-01",
        returnDate: "2024-02-07",
        departureCity: "Tashkent"
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
        color: "from-indigo-500 to-purple-500",
        departureDate: "2024-02-10",
        returnDate: "2024-02-15",
        departureCity: "Tashkent"
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
        color: "from-pink-500 to-rose-500",
        departureDate: "2024-02-20",
        returnDate: "2024-02-28",
        departureCity: "Tashkent"
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
        color: "from-amber-500 to-red-500",
        departureDate: "2024-03-01",
        returnDate: "2024-03-08",
        departureCity: "Tashkent"
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
        color: "from-green-500 to-emerald-500",
        departureDate: "2024-03-10",
        returnDate: "2024-03-16",
        departureCity: "Tashkent"
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
        color: "from-violet-500 to-purple-500",
        departureDate: "2024-03-20",
        returnDate: "2024-03-26",
        departureCity: "Tashkent"
    },
    {
        id: 9,
        destination: "istanbul",
        image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: "$549",
        duration: "7",
        rating: 4.8,
        reviews: 289,
        availableSeats: 25,
        color: "from-red-500 to-pink-500",
        departureDate: "2024-04-01",
        returnDate: "2024-04-08",
        departureCity: "Tashkent"
    }
];

const BookingModal = ({ isOpen, onClose, flight }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        phone: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = t('bookingModal.errors.nameRequired');
        if (!formData.phone.trim()) newErrors.phone = t('bookingModal.errors.phoneRequired');

        if (Object.keys(newErrors).length === 0) {
            setIsSubmitting(true);
            try {
                const bookingData = {
                    name: formData.name,
                    phone: formData.phone,
                    tourName: t(`flights.destinations.${flight.destination}.name`),
                    tourPrice: flight.price,
                    tourDate: `${flight.departureDate} - ${flight.returnDate}`,
                    subject: 'Flight Booking',
                    message: `Flight booking request for ${t(`flights.destinations.${flight.destination}.name`)}`
                };

                await sendToTelegram(bookingData);
                onClose();
            } catch (error) {
                console.error('Booking error:', error);
                setErrors({ submit: t('bookingModal.errors.submitError') });
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-white rounded-2xl p-6 max-w-md w-full relative"
                    >
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                        >
                            <FaTimes className="w-5 h-5" />
                        </button>

                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            {t('bookingModal.title')}
                        </h2>

                        <div className="bg-gray-50 rounded-xl p-4 mb-6">
                            <h3 className="font-medium text-gray-700 mb-2">
                                {t('bookingModal.flightDetails')}:
                            </h3>
                            <p className="text-gray-600">
                                {t(`flights.destinations.${flight.destination}.name`)}
                            </p>
                            <p className="text-gray-600">{flight.price}</p>
                            <p className="text-gray-600">
                                {flight.departureDate} - {flight.returnDate}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('bookingModal.form.name')}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={t('bookingModal.form.namePlaceholder')}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('bookingModal.form.phone')}
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={t('bookingModal.form.phonePlaceholder')}
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                )}
                            </div>

                            {errors.submit && (
                                <p className="text-red-500 text-sm">{errors.submit}</p>
                            )}

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    {t('bookingModal.buttons.cancel')}
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                                >
                                    {isSubmitting
                                        ? t('bookingModal.buttons.submitting')
                                        : t('bookingModal.buttons.submit')}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const FlightDetails = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    
    const flight = flights.find(f => f.id === parseInt(id));

    if (!flight) {
        return (
            <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center">
                <h1 className="text-2xl">{t('flightDetails.notFound')}</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-20">
            <div className="container mx-auto px-4">
                {/* Hero Section */}
                <div className="relative h-[400px] rounded-3xl overflow-hidden mb-8 shadow-lg">
                    <img
                        src={flight.image}
                        alt={t(`flights.destinations.${flight.destination}.name`)}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-bold text-white mb-4"
                        >
                            {t(`flights.destinations.${flight.destination}.name`)}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-gray-200"
                        >
                            {t(`flights.destinations.${flight.destination}.description`)}
                        </motion.p>
                    </div>
                </div>

                {/* Flight Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column - Flight Details */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-50 rounded-3xl p-8 shadow-md"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('flightDetails.flightInfo')}</h2>
                        
                        <div className="space-y-6">
                            {/* Departure */}
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-blue-100 rounded-xl">
                                    <FaPlane className="text-blue-600 text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">{t('flightDetails.departure')}</h3>
                                    <p className="text-gray-600">{flight.departureCity}</p>
                                </div>
                            </div>

                            {/* Duration */}
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-green-100 rounded-xl">
                                    <FaClock className="text-green-600 text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">{t('flightDetails.duration')}</h3>
                                    <p className="text-gray-600">{flight.duration} {t('flightDetails.days')}</p>
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-purple-100 rounded-xl">
                                    <FaCalendarAlt className="text-purple-600 text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">{t('flightDetails.dates')}</h3>
                                    <p className="text-gray-600">
                                        {flight.departureDate} - {flight.returnDate}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Booking Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gray-50 rounded-3xl p-8 shadow-md"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('flightDetails.bookingInfo')}</h2>
                        
                        <div className="space-y-6">
                            {/* Price */}
                            <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
                                <span className="text-gray-700">{t('flightDetails.price')}</span>
                                <span className="text-2xl font-bold text-gray-800">{flight.price}</span>
                            </div>

                            {/* Available Seats */}
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-yellow-100 rounded-xl">
                                    <FaUsers className="text-yellow-600 text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">{t('flightDetails.availableSeats')}</h3>
                                    <p className="text-gray-600">{flight.availableSeats} {t('flightDetails.seats')}</p>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-orange-100 rounded-xl">
                                    <FaStar className="text-orange-600 text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">{t('flightDetails.rating')}</h3>
                                    <p className="text-gray-600">
                                        {flight.rating} ({flight.reviews} {t('flightDetails.reviews')})
                                    </p>
                                </div>
                            </div>

                            {/* Book Now Button */}
                            <button 
                                onClick={() => setIsBookingModalOpen(true)}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition duration-300 mt-4"
                            >
                                {t('flightDetails.bookNow')}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                flight={flight}
            />
        </div>
    );
};

export default FlightDetails;
