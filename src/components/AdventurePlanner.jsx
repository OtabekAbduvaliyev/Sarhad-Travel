import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMountain, FaWater, FaTree, FaCampground, FaHiking, FaSkiing, FaUmbrellaBeach, FaSwimmer } from 'react-icons/fa';
import { BiWorld } from 'react-icons/bi';
import { RiCompassDiscoverLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';

const activities = [
    {
        id: 'mountainClimbing',
        icon: FaMountain,
        color: "from-rose-500 to-orange-500",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1470&auto=format&fit=crop"
    },
    {
        id: 'scubaDiving',
        icon: FaSwimmer,
        color: "from-blue-500 to-cyan-400",
        image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=1470&auto=format&fit=crop"
    },
    {
        id: 'hiking',
        icon: FaHiking,
        color: "from-green-500 to-emerald-400",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1470&auto=format&fit=crop"
    },
    {
        id: 'skiing',
        icon: FaSkiing,
        color: "from-indigo-500 to-purple-400",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1470&auto=format&fit=crop"
    }
];

const AdventurePlanner = () => {
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [hoveredActivity, setHoveredActivity] = useState(null);
    const { t } = useTranslation();

    return (
        <div className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-full h-full">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-white/5"
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
                    <motion.div
                        className="flex items-center justify-center mb-6"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <BiWorld className="w-20 h-20 text-orange-500 opacity-80" />
                    </motion.div>
                    <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-rose-500 text-transparent bg-clip-text">
                        {t('adventurePlanner.section.title')}
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        {t('adventurePlanner.section.description')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                    {activities.map((activity, index) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onHoverStart={() => setHoveredActivity(activity.id)}
                            onHoverEnd={() => setHoveredActivity(null)}
                            onClick={() => setSelectedActivity(activity.id === selectedActivity ? null : activity.id)}
                            className="relative group cursor-pointer"
                        >
                            <div className="relative h-[400px] rounded-3xl overflow-hidden">
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <motion.img
                                        src={activity.image}
                                        alt={t(`adventurePlanner.activities.${activity.id}.name`)}
                                        className="w-full h-full object-cover"
                                        initial={{ scale: 1 }}
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="relative h-full p-8 flex flex-col justify-end">
                                    <motion.div
                                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${activity.color} flex items-center justify-center mb-6`}
                                        whileHover={{ scale: 1.1, rotate: 360 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <activity.icon className="w-8 h-8 text-white" />
                                    </motion.div>

                                    <motion.h3
                                        className="text-3xl font-bold mb-4"
                                        initial={{ x: 0 }}
                                        whileHover={{ x: 10 }}
                                    >
                                        {t(`adventurePlanner.activities.${activity.id}.name`)}
                                    </motion.h3>

                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{
                                            opacity: hoveredActivity === activity.id ? 1 : 0,
                                            height: hoveredActivity === activity.id ? "auto" : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-3"
                                    >
                                        <p className="text-gray-300">
                                            {t(`adventurePlanner.activities.${activity.id}.description`)}
                                        </p>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-400">{t('adventurePlanner.labels.difficulty')}:</span>
                                                <p className="font-semibold">
                                                    {t(`adventurePlanner.activities.${activity.id}.difficulty`)}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-gray-400">{t('adventurePlanner.labels.duration')}:</span>
                                                <p className="font-semibold">
                                                    {t(`adventurePlanner.activities.${activity.id}.duration`)}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-gray-400">{t('adventurePlanner.labels.season')}:</span>
                                                <p className="font-semibold">
                                                    {t(`adventurePlanner.activities.${activity.id}.season`)}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            <RiCompassDiscoverLine className="w-5 h-5 text-orange-500" />
                                            <span className="text-sm text-orange-500 font-medium">
                                                {t(`adventurePlanner.activities.${activity.id}.locations`, { returnObjects: true }).join(" • ")}
                                            </span>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Hover Effect Overlay */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20"
                                    style={{
                                        backgroundImage: `linear-gradient(to right, ${activity.color.split(' ')[1]}, ${activity.color.split(' ')[3]})`
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdventurePlanner;
