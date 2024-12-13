import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { sendToTelegram } from '../utils/telegram';
import { ToastContainer, toast } from 'react-toastify';
const BookingModal = ({ isOpen, onClose, tourData }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = t('bookingModal.errors.nameRequired');
        }
        if (!formData.phone.trim()) {
            newErrors.phone = t('bookingModal.errors.phoneRequired');
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            setIsSubmitting(true);
            try {
                // Prepare message for Telegram
                const bookingData = {
                    name: formData.name,
                    phone: formData.phone,
                    tourName: tourData.name,
                    tourPrice: tourData.price,
                    tourDate: tourData.date,
                    message: `Booking request for ${tourData.name}`,
                    subject: 'Tour Booking Request'
                };

                await sendToTelegram(bookingData);
                toast('Booking submitted successfully!');
                console.log('Booking submitted successfully!');
                onClose();
                // You might want to show a success message or redirect
            } catch (error) {
                console.error('Error submitting booking:', error);
                toast('Booking submitted successfully!');
                setErrors({ submit: t('bookingModal.errors.submitError') });
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setErrors(newErrors);
        }
    };

    const modalVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <AnimatePresence>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={modalVariants}
                    className="bg-white rounded-lg p-6 max-w-md w-full"
                >
                    <h2 className="text-2xl font-semibold mb-4">
                        {t('bookingModal.title')}
                    </h2>

                    <div className="mb-6">
                        <h3 className="font-medium text-gray-700 mb-2">
                            {t('bookingModal.tourDetails')}:
                        </h3>
                        <div className="bg-gray-50 p-3 rounded">
                            <p className="text-gray-600">{tourData.name}</p>
                            <p className="text-gray-600">{tourData.price}</p>
                            <p className="text-gray-600">{tourData.date}</p>
                        </div>
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                            >
                                {isSubmitting
                                    ? t('bookingModal.buttons.submitting')
                                    : t('bookingModal.buttons.submit')}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default BookingModal;
