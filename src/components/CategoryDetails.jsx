import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { IoSunnyOutline, IoArrowBack, IoChevronForward } from 'react-icons/io5';
import { FaPlane, FaCog, FaImage, FaRegCalendarAlt } from 'react-icons/fa';
import { MdEventAvailable, MdExplore, MdLocationOn } from 'react-icons/md';
import BookingModal from './BookingModal';

const CategoryDetails = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Map of category icons
  const categoryIcons = {
    weather: IoSunnyOutline,
    flights: FaPlane,
    events: MdEventAvailable,
    customization: FaCog,
    adventure: MdExplore,
    cultural: MdEventAvailable,
  };

  // Default images for development (replace with your actual images)
  const defaultImages = {
    weather: [
      'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b',
      'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c',
      'https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0',
    ],
    flights: [
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05',
      'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957',
    ],
    events: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
      'https://images.unsplash.com/photo-1511578314322-379afb476865',
      'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec',
    ],
    customization: [
      'https://images.unsplash.com/photo-1551434678-e076c223a692',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    ],
    adventure: [
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3',
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2',
      'https://images.unsplash.com/photo-1530549387789-4c1017266635',
    ],
    cultural: [
      'https://images.unsplash.com/photo-1533669955142-6a73332af4db',
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8',
      'https://images.unsplash.com/photo-1601901773781-d217b3c2c6d7',
    ],
  };

  // Get category data based on categoryId
  const getCategoryData = () => {
    const categoryColors = {
      weather: {
        color: "from-blue-400 to-blue-600",
        lightColor: "from-blue-400/10 to-blue-600/10"
      },
      flights: {
        color: "from-purple-400 to-purple-600",
        lightColor: "from-purple-400/10 to-purple-600/10"
      },
      events: {
        color: "from-green-400 to-green-600",
        lightColor: "from-green-400/10 to-green-600/10"
      },
      customization: {
        color: "from-orange-400 to-orange-600",
        lightColor: "from-orange-400/10 to-orange-600/10"
      },
      adventure: {
        color: "from-red-400 to-red-600",
        lightColor: "from-red-400/10 to-red-600/10"
      },
      cultural: {
        color: "from-blue-400 to-blue-600",
        lightColor: "from-blue-400/10 to-blue-600/10"
      }
    };

    const categories = {
      weather: {
        title: t('categories.items.weather.title', 'Weather Updates'),
        description: t('categories.items.weather.description', 'Stay informed about weather conditions'),
        ...categoryColors.weather,
        features: [
          { 
            title: t('categories.items.weather.features.forecast', 'Detailed Forecasts'),
            description: t('categories.items.weather.features.forecastDesc', 'Get accurate weather predictions'),
            icon: IoSunnyOutline,
            stats: [
              t('categories.items.weather.stats.updates', '24/7 Updates'),
              t('categories.items.weather.stats.accuracy', '95% Accuracy'),
              t('categories.items.weather.stats.forecast', '10-day Forecast')
            ]
          },
          { 
            title: t('categories.items.weather.features.alerts', 'Weather Alerts'),
            description: t('categories.items.weather.features.alertsDesc', 'Stay safe with real-time weather alerts'),
            icon: FaRegCalendarAlt,
            stats: [
              t('categories.items.weather.stats.alerts', 'Real-time Alerts'),
              t('categories.items.weather.stats.notifications', 'Custom Notifications'),
              t('categories.items.weather.stats.updates', 'Emergency Updates')
            ]
          },
          { 
            title: t('categories.items.weather.features.planning', 'Travel Planning'),
            description: t('categories.items.weather.features.planningDesc', 'Plan your trip with confidence'),
            icon: MdLocationOn,
            stats: [
              t('categories.items.weather.stats.planning', 'Smart Planning'),
              t('categories.items.weather.stats.suggestions', 'Activity Suggestions'),
              t('categories.items.weather.stats.insights', 'Local Insights')
            ]
          }
        ],
        gallery: defaultImages.weather
      },
      flights: {
        title: t('categories.items.flights.title', 'Flight Booking'),
        description: t('categories.items.flights.description', 'Book your flights with ease'),
        ...categoryColors.flights,
        features: [
          { 
            title: t('categories.items.flights.features.booking', 'Instant Booking'),
            description: t('categories.items.flights.features.bookingDesc', 'Book your flights instantly'),
            icon: FaPlane,
            stats: [
              t('categories.items.flights.stats.booking', 'Instant Booking'),
              t('categories.items.flights.stats.support', '24/7 Support'),
              t('categories.items.flights.stats.guarantee', 'Best Price Guarantee')
            ]
          },
          { 
            title: t('categories.items.flights.features.tracking', 'Flight Tracking'),
            description: t('categories.items.flights.features.trackingDesc', 'Track your flights in real-time'),
            icon: FaCog,
            stats: [
              t('categories.items.flights.stats.tracking', 'Live Updates'),
              t('categories.items.flights.stats.notifications', 'Delay Notifications'),
              t('categories.items.flights.stats.changes', 'Gate Changes')
            ]
          },
          { 
            title: t('categories.items.flights.features.deals', 'Flight Deals'),
            description: t('categories.items.flights.features.dealsDesc', 'Get the best flight deals'),
            icon: FaImage,
            stats: [
              t('categories.items.flights.stats.deals', 'Price Alerts'),
              t('categories.items.flights.stats.exclusive', 'Exclusive Deals'),
              t('categories.items.flights.stats.comparison', 'Price Comparison')
            ]
          }
        ],
        gallery: defaultImages.flights
      },
      events: {
        title: t('categories.items.events.title', 'Local Events'),
        description: t('categories.items.events.description', 'Discover exciting local events'),
        ...categoryColors.events,
        features: [
          { 
            title: t('categories.items.events.features.calendar', 'Event Calendar'),
            description: t('categories.items.events.features.calendarDesc', 'Plan events with interactive calendar'),
            icon: FaRegCalendarAlt,
            stats: [
              t('categories.items.events.stats.events', 'Daily Events'),
              t('categories.items.events.stats.venues', 'Partner Venues'),
              t('categories.items.events.stats.booking', 'Quick Booking')
            ]
          },
          { 
            title: t('categories.items.events.features.booking', 'Event Booking'),
            description: t('categories.items.events.features.bookingDesc', 'Book popular local events'),
            icon: MdEventAvailable,
            stats: [
              t('categories.items.events.stats.updates', 'Live Updates'),
              t('categories.items.events.stats.categories', 'Event Types'),
              t('categories.items.events.stats.exclusive', 'Exclusive Events')
            ]
          },
          { 
            title: t('categories.items.events.features.recommendations', 'Personal Recommendations'),
            description: t('categories.items.events.features.recommendationsDesc', 'Get event recommendations'),
            icon: MdLocationOn,
            stats: [
              t('categories.items.events.stats.local', 'Local Experiences'),
              t('categories.items.events.stats.cultural', 'Cultural Shows'),
              t('categories.items.events.stats.activities', 'Activities')
            ]
          }
        ],
        gallery: defaultImages.events
      },
      customization: {
        title: t('categories.items.customization.title', 'Trip Customization'),
        description: t('categories.items.customization.description', 'Customize your travel experience'),
        ...categoryColors.customization,
        features: [
          { 
            title: t('categories.items.customization.features.itinerary', 'Custom Itinerary'),
            description: t('categories.items.customization.features.itineraryDesc', 'Create your perfect travel schedule'),
            icon: FaRegCalendarAlt,
            stats: [
              t('categories.items.customization.stats.options', 'Customization Options'),
              t('categories.items.customization.stats.satisfaction', 'Customer Satisfaction'),
              t('categories.items.customization.stats.support', '24/7 Support')
            ]
          },
          { 
            title: t('categories.items.customization.features.preferences', 'Travel Preferences'),
            description: t('categories.items.customization.features.preferencesDesc', 'Set preferences for personalized experience'),
            icon: FaCog,
            stats: [
              t('categories.items.customization.stats.experts', 'Travel Experts'),
              t('categories.items.customization.stats.destinations', 'Destinations'),
              t('categories.items.customization.stats.activities', 'Activities')
            ]
          },
          { 
            title: t('categories.items.customization.features.assistance', 'Personal Assistant'),
            description: t('categories.items.customization.features.assistanceDesc', 'Get help from travel experts'),
            icon: MdLocationOn,
            stats: [
              t('categories.items.customization.stats.languages', 'Languages'),
              t('categories.items.customization.stats.packages', 'Custom Packages'),
              t('categories.items.customization.stats.reviews', 'Positive Reviews')
            ]
          }
        ],
        gallery: defaultImages.customization
      },
      adventure: {
        title: t('categories.items.adventure.title', 'Adventure Tours'),
        description: t('categories.items.adventure.description', 'Experience thrilling adventures'),
        ...categoryColors.adventure,
        features: [
          { 
            title: t('categories.items.adventure.features.activities', 'Adventure Activities'),
            description: t('categories.items.adventure.features.activitiesDesc', 'Choose from exciting activities'),
            icon: MdExplore,
            stats: [
              t('categories.items.adventure.stats.adventures', 'Adventure Types'),
              t('categories.items.adventure.stats.locations', 'Locations'),
              t('categories.items.adventure.stats.guides', 'Expert Guides')
            ]
          },
          { 
            title: t('categories.items.adventure.features.equipment', 'Equipment Rental'),
            description: t('categories.items.adventure.features.equipmentDesc', 'Access quality adventure gear'),
            icon: FaCog,
            stats: [
              t('categories.items.adventure.stats.equipment', 'Equipment Options'),
              t('categories.items.adventure.stats.safety', 'Safety Rating'),
              t('categories.items.adventure.stats.training', 'Training Sessions')
            ]
          },
          { 
            title: t('categories.items.adventure.features.guides', 'Expert Guides'),
            description: t('categories.items.adventure.features.guidesDesc', 'Professional guides for safety'),
            icon: MdLocationOn,
            stats: [
              t('categories.items.adventure.stats.difficulty', 'Difficulty Levels'),
              t('categories.items.adventure.stats.groups', 'Group Sizes'),
              t('categories.items.adventure.stats.insurance', 'Insurance Coverage')
            ]
          }
        ],
        gallery: defaultImages.adventure
      },
      cultural: {
        title: t('categories.items.cultural.title', 'Cultural Experiences'),
        description: t('categories.items.cultural.description', 'Immerse in local traditions'),
        ...categoryColors.cultural,
        features: [
          { 
            title: t('categories.items.cultural.features.traditions', 'Local Traditions'),
            description: t('categories.items.cultural.features.traditionsDesc', 'Experience authentic culture'),
            icon: MdEventAvailable,
            stats: [
              t('categories.items.cultural.stats.experiences', 'Cultural Experiences'),
              t('categories.items.cultural.stats.communities', 'Local Communities'),
              t('categories.items.cultural.stats.workshops', 'Weekly Workshops')
            ]
          },
          { 
            title: t('categories.items.cultural.features.workshops', 'Cultural Workshops'),
            description: t('categories.items.cultural.features.workshopsDesc', 'Learn traditional arts'),
            icon: FaCog,
            stats: [
              t('categories.items.cultural.stats.cuisine', 'Local Dishes'),
              t('categories.items.cultural.stats.artisans', 'Local Artisans'),
              t('categories.items.cultural.stats.traditions', 'Traditional Events')
            ]
          },
          { 
            title: t('categories.items.cultural.features.cuisine', 'Local Cuisine'),
            description: t('categories.items.cultural.features.cuisineDesc', 'Taste authentic dishes'),
            icon: MdLocationOn,
            stats: [
              t('categories.items.cultural.stats.languages', 'Local Languages'),
              t('categories.items.cultural.stats.heritage', 'Heritage Sites'),
              t('categories.items.cultural.stats.festivals', 'Annual Festivals')
            ]
          }
        ],
        gallery: defaultImages.cultural
      }
    };

    return categories[categoryId] || null;
  };

  const categoryData = getCategoryData();
  const Icon = categoryIcons[categoryId];

  const handleBookNow = (tour) => {
    setSelectedTour(tour);
    setIsBookingModalOpen(true);
  };

  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('categories.notFound')}</h2>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <IoArrowBack className="mr-2" />
            {t('common.goBack')}
          </button>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: t('common.overview', 'Overview') },
    { id: 'features', label: t('common.features', 'Features') },
    { id: 'gallery', label: t('common.gallery', 'Gallery') }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Parallax Effect */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`relative h-[50vh] overflow-hidden bg-gradient-to-br ${categoryData.color}`}
      >
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-24 left-6 z-50 flex items-center space-x-2 px-4 py-2 text-white bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg"
        >
          <IoArrowBack className="text-xl group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">{t('common.goBack')}</span>
        </motion.button>
        
        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-white/10 rounded-full blur-xl"
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            {Icon && <Icon className="mx-auto text-5xl mb-4" />}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{categoryData.title}</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">{categoryData.description}</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="sticky top-20 bg-white shadow-md z-20">
        <div className="max-w-7xl mx-auto">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 text-center font-medium text-sm sm:text-base transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categoryData.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryData.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.stats.map((stat, statIndex) => (
                        <span
                          key={statIndex}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                        >
                          {stat}
                        </span>
                      ))}
                    </div>

                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-12">
                {categoryData.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-xl"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${categoryData.color} flex items-center justify-center mb-6`}>
                          <feature.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                        <p className="text-gray-600 text-lg mb-6">{feature.description}</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {feature.stats.map((stat, statIndex) => (
                          <div
                            key={statIndex}
                            className="bg-gray-50 rounded-xl p-4 text-center"
                          >
                            <div className="text-sm font-medium text-gray-600">{stat}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(categoryData.gallery || defaultImages[categoryId] || []).map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden group"
                  >
                    <img
                      src={image}
                      alt={`${categoryData.title} ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button className="px-6 py-3 bg-white/90 rounded-lg text-gray-900 font-medium transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        View Image
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        tourData={selectedTour}
      />
    </div>
  );
};

export default CategoryDetails;
