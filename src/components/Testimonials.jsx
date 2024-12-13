import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

const testimonials = [
    {
        id: 'sarah',
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        rating: 5,
        gradient: "from-orange-400 to-pink-500"
    },
    {
        id: 'michael',
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        rating: 5,
        gradient: "from-blue-400 to-purple-500"
    },
    {
        id: 'emma',
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        rating: 5,
        gradient: "from-teal-400 to-emerald-500"
    }
];

const Testimonials = () => {
    const { t } = useTranslation();

    return (
        <div className="py-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
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
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold text-gray-900 mb-6">
                        {t('testimonials.section.title')}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {t('testimonials.section.description')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative h-full"
                        >
                            {/* Card Background with Gradient Border */}
                            <div className="absolute inset-0 bg-gradient-to-r w-full h-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity"
                                style={{ background: `linear-gradient(to right, var(--${testimonial.gradient}-from), var(--${testimonial.gradient}-to))` }}
                            />
                            
                            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                {/* Quote Icon */}
                                <div className="absolute -top-4 right-8">
                                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center`}>
                                        <FaQuoteLeft className="text-white w-4 h-4" />
                                    </div>
                                </div>

                                {/* Profile Section */}
                                <div className="flex items-center mb-6">
                                    <div className="relative shrink-0">
                                        <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} rounded-full blur-sm opacity-50`} />
                                        <img
                                            src={testimonial.image}
                                            alt={t(`testimonials.reviews.${testimonial.id}.name`)}
                                            className="w-16 h-16 rounded-full object-cover relative"
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="font-bold text-lg text-gray-900 line-clamp-1">
                                            {t(`testimonials.reviews.${testimonial.id}.name`)}
                                        </h3>
                                        <p className="text-gray-600 flex items-center line-clamp-1">
                                            <FaMapMarkerAlt className="w-4 h-4 mr-1 text-gray-400 shrink-0" />
                                            {t(`testimonials.reviews.${testimonial.id}.location`)}
                                        </p>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <FaStar key={i} className={`w-5 h-5 text-yellow-400`} />
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <p className="text-gray-700 mb-6 leading-relaxed flex-grow line-clamp-4">
                                    "{t(`testimonials.reviews.${testimonial.id}.text`)}"
                                </p>

                                {/* Destination */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${testimonial.gradient} font-semibold`}>
                                        {t('testimonials.tripTo')} {t(`testimonials.reviews.${testimonial.id}.destination`)}
                                    </span>
                                    <BsArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
