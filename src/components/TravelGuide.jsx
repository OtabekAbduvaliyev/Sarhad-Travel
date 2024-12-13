import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaPassport, FaSuitcase, FaGlobeAsia, FaPlane, FaUtensils, FaWifi, FaMoneyBillWave, FaShieldAlt } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

const guides = [
    {
        id: 1,
        key: "bestTime",
        icon: FaCalendarAlt,
        color: "from-orange-400 to-pink-500"
    },
    {
        id: 2,
        key: "documents",
        icon: FaPassport,
        color: "from-blue-400 to-indigo-500"
    },
    {
        id: 3,
        key: "packing",
        icon: FaSuitcase,
        color: "from-green-400 to-teal-500"
    },
    {
        id: 4,
        key: "customs",
        icon: FaGlobeAsia,
        color: "from-purple-400 to-pink-500"
    },
    {
        id: 5,
        key: "dining",
        icon: FaUtensils,
        color: "from-red-400 to-orange-500"
    },
    {
        id: 6,
        key: "connectivity",
        icon: FaWifi,
        color: "from-cyan-400 to-blue-500"
    },
    {
        id: 7,
        key: "budget",
        icon: FaMoneyBillWave,
        color: "from-emerald-400 to-green-500"
    },
    {
        id: 8,
        key: "safety",
        icon: FaShieldAlt,
        color: "from-violet-400 to-purple-500"
    }
];

const TravelGuide = () => {
    const { t } = useTranslation();

    return (
        <div className="py-20 bg-gray-50 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.05 }}
                    transition={{ duration: 1 }}
                    className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.05 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.05 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl"
                />
                
                {/* Animated Planes */}
                <motion.div
                    initial={{ x: -100, y: -100 }}
                    animate={{ x: window.innerWidth + 100, y: window.innerHeight + 100 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute"
                >
                    <FaPlane className="text-gray-200 w-8 h-8 transform rotate-45" />
                </motion.div>
                <motion.div
                    initial={{ x: window.innerWidth + 100, y: -100 }}
                    animate={{ x: -100, y: window.innerHeight + 100 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
                    className="absolute"
                >
                    <FaPlane className="text-gray-200 w-6 h-6 transform -rotate-45" />
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        {t('travelGuide.header.title')}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {t('travelGuide.header.description')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {guides.map((guide, index) => (
                        <motion.div
                            key={guide.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative group h-full"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r w-full h-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity"
                                style={{ background: `linear-gradient(to right, var(--${guide.color}-from), var(--${guide.color}-to))` }}
                            />
                            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-r ${guide.color} text-white`}>
                                    <guide.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                                    {t(`travelGuide.guides.${guide.key}.title`)}
                                </h3>
                                <ul className="space-y-3 text-gray-600 flex-grow">
                                    {t(`travelGuide.guides.${guide.key}.items`, { returnObjects: true }).map((item, i) => (
                                        <li key={i} className="flex items-start">
                                            <BsArrowRight className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TravelGuide;
