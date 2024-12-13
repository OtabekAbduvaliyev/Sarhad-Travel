import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: t('footer.quickLinks.home'), path: '/' },
        { name: t('footer.quickLinks.about'), path: '/about' },
        { name: t('footer.quickLinks.destinations'), path: '/destinations' },
        { name: t('footer.quickLinks.tours'), path: '/tours' },
        { name: t('footer.quickLinks.contact'), path: '/contact' }
    ];

    const destinations = [
        { key: 'tashkent', name: t('footer.destinations.tashkent') },
        { key: 'samarkand', name: t('footer.destinations.samarkand') },
        { key: 'bukhara', name: t('footer.destinations.bukhara') },
        { key: 'khiva', name: t('footer.destinations.khiva') },
        { key: 'ferganaValley', name: t('footer.destinations.ferganaValley') },
        { key: 'nukus', name: t('footer.destinations.nukus') }
    ];

    const socialLinks = [
        { icon: <FaFacebookF />, url: 'https://facebook.com' },
        { icon: <FaTwitter />, url: 'https://twitter.com' },
        { icon: <FaInstagram />, url: 'https://instagram.com' },
        { icon: <FaLinkedinIn />, url: 'https://linkedin.com' }
    ];

    return (
        <footer className="bg-gray-50 text-gray-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('footer.company.name')}</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {t('footer.company.description')}
                        </p>
                        <div className="flex space-x-4 pt-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center 
                                             hover:bg-blue-50 hover:text-blue-500 transition-colors duration-300"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-6">{t('footer.sections.quickLinks')}</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link 
                                        to={link.path}
                                        className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Popular Destinations */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-6">{t('footer.sections.popularDestinations')}</h4>
                        <ul className="space-y-3">
                            {destinations.map((destination) => (
                                <li 
                                    key={destination.key}
                                    className="text-gray-600 hover:text-blue-500 transition-colors duration-300 cursor-pointer"
                                >
                                    {destination.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-6">{t('footer.sections.contactInfo')}</h4>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <FaMapMarkerAlt className="text-blue-500 mt-1 flex-shrink-0" />
                                <span className="text-gray-600">
                                    {t('footer.contact.address')}
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaPhone className="text-blue-500 flex-shrink-0" />
                                <span className="text-gray-600">{t('footer.contact.phone')}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaEnvelope className="text-blue-500 flex-shrink-0" />
                                <span className="text-gray-600">{t('footer.contact.email')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-gray-500 text-sm">
                            {t('footer.bottom.rights', { year: currentYear })}
                        </div>
                        <div className="flex space-x-6 text-sm">
                            <Link to="/privacy" className="text-gray-500 hover:text-blue-500 transition-colors duration-300">
                                {t('footer.bottom.privacy')}
                            </Link>
                            <Link to="/terms" className="text-gray-500 hover:text-blue-500 transition-colors duration-300">
                                {t('footer.bottom.terms')}
                            </Link>
                            <Link to="/sitemap" className="text-gray-500 hover:text-blue-500 transition-colors duration-300">
                                {t('footer.bottom.sitemap')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
