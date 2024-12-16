import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { sendToTelegram } from '../utils/telegram';

const ContactForm = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = t('contactForm.form.errors.name');
        if (!formData.email.trim()) {
            newErrors.email = t('contactForm.form.errors.email.required');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('contactForm.form.errors.email.invalid');
        }
        if (!formData.message.trim()) newErrors.message = t('contactForm.form.errors.message');
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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
            setSubmitStatus({ type: '', message: '' });
            
            try {
                // First verify the bot configuration
                const { sendToTelegram, testTelegramBot } = await import('../utils/telegram');
                await testTelegramBot();
                
                // If verification passes, proceed with sending the message
                await sendToTelegram(formData);
                
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
                setSubmitStatus({
                    type: 'success',
                    message: t('contactForm.form.success')
                });
            } catch (error) {
                console.error('Error submitting form:', error);
                setSubmitStatus({
                    type: 'error',
                    message: `${t('contactForm.form.error')}: ${error.message}`
                });
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setErrors(newErrors);
        }
    };

    const inputClasses = "w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors duration-200";
    const labelClasses = "block text-gray-600 text-sm mb-2";
    const errorClasses = "text-red-500 text-sm mt-1";

    return (
        <section id="contact" className="py-20 px-4 md:px-8 bg-gray-50">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                        {t('contactForm.section.title')}
                    </h2>
                    <p className="text-gray-600">
                        {t('contactForm.section.description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="text-gray-400">
                                <FaEnvelope className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-800 mb-1">{t('contactForm.contact.email.title')}</h3>
                                <p className="text-gray-600 text-sm">{t('contactForm.contact.email.primary')}</p>
                                <p className="text-gray-600 text-sm">{t('contactForm.contact.email.support')}</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="text-gray-400">
                                <FaPhone className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-800 mb-1">{t('contactForm.contact.phone.title')}</h3>
                                <p className="text-gray-600 text-sm">{t('contactForm.contact.phone.primary')}</p>
                                <p className="text-gray-600 text-sm">{t('contactForm.contact.phone.secondary')}</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="text-gray-400">
                                <FaMapMarkerAlt className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-800 mb-1">{t('contactForm.contact.address.title')}</h3>
                                <p className="text-gray-600 text-sm">{t('contactForm.contact.address.line1')}</p>
                                <p className="text-gray-600 text-sm">{t('contactForm.contact.address.line2')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className={labelClasses}>{t('contactForm.form.labels.name')}</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={inputClasses}
                                        placeholder={t('contactForm.form.placeholders.name')}
                                    />
                                    {errors.name && <p className={errorClasses}>{errors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className={labelClasses}>{t('contactForm.form.labels.email')}</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={inputClasses}
                                        placeholder={t('contactForm.form.placeholders.email')}
                                    />
                                    {errors.email && <p className={errorClasses}>{errors.email}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="phone" className={labelClasses}>{t('contactForm.form.labels.phone')}</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={inputClasses}
                                        placeholder={t('contactForm.form.placeholders.phone')}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className={labelClasses}>{t('contactForm.form.labels.subject')}</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={inputClasses}
                                        placeholder={t('contactForm.form.placeholders.subject')}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className={labelClasses}>{t('contactForm.form.labels.message')}</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className={inputClasses}
                                    placeholder={t('contactForm.form.placeholders.message')}
                                />
                                {errors.message && <p className={errorClasses}>{errors.message}</p>}
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 px-6 rounded-lg text-white font-medium flex items-center justify-center space-x-2 ${
                                    isSubmitting ? 'bg-gray-400' : 'bg-gray-900 hover:bg-gray-800'
                                } transition-colors duration-200`}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>{t('contactForm.form.button.sending')}</span>
                                    </div>
                                ) : (
                                    <>
                                        <FaPaperPlane className="w-4 h-4" />
                                        <span>{t('contactForm.form.button.send')}</span>
                                    </>
                                )}
                            </motion.button>

                            {submitStatus.type === 'success' && (
                                <p className="text-green-500 text-sm mt-2">{submitStatus.message}</p>
                            )}

                            {submitStatus.type === 'error' && (
                                <p className="text-red-500 text-sm mt-2">{submitStatus.message}</p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
