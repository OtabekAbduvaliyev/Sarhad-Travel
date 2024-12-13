import { motion } from 'framer-motion';
import { FaPlane, FaCog, FaMapMarkedAlt, FaRegCompass } from 'react-icons/fa';
import { IoSunnyOutline, IoTimeOutline, IoEarthOutline } from 'react-icons/io5';
import { MdEventAvailable, MdExplore, MdMuseum } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ icon: Icon, title, description, color, lightColor, categoryId, index }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative bg-white rounded-2xl p-6 h-[280px] w-full overflow-hidden group shadow-lg flex flex-col"
    >
      {/* Animated Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${lightColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      {/* Default Background Elements */}
      <div className="absolute inset-0">
        <div className={`absolute right-0 top-0 w-24 h-24 bg-gradient-to-br ${color} opacity-5 -rotate-45`} />
        <div className={`absolute left-0 bottom-0 w-24 h-24 bg-gradient-to-tl ${color} opacity-5 -rotate-45`} />
        <div className={`absolute right-8 bottom-8 w-2 h-2 rounded-full bg-gradient-to-r ${color} opacity-20`} />
        <div className={`absolute left-8 top-8 w-2 h-2 rounded-full bg-gradient-to-r ${color} opacity-20`} />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Icon Container */}
        <div className="relative mb-6 inline-flex">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} relative flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}>
            {/* Shine Effect */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
            
            {/* Icon */}
            <Icon className="w-8 h-8 text-white transform group-hover:scale-110 transition-transform duration-300" />
            
            {/* Decorative Elements */}
            <div className={`absolute -right-1 top-1/4 w-1 h-4 bg-gradient-to-b ${color} opacity-40`} />
            <div className={`absolute left-1/4 -top-1 h-1 w-4 bg-gradient-to-r ${color} opacity-40`} />
          </div>
          {/* Number Badge */}
          <div className={`absolute -right-2 -top-2 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-xs font-semibold text-gray-600 border border-gray-100`}>
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-xl font-bold text-gray-900">
              {title}
            </h3>
            <div className={`w-8 h-0.5 bg-gradient-to-r ${color} opacity-30`} />
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Learn More Button */}
        <div className="mt-auto">
          <button 
            onClick={handleLearnMore}
            className={`group/btn flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200
              hover:border-transparent transition-all duration-300 hover:shadow-lg relative overflow-hidden`}
          >
            {/* Button Background */}
            <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-all duration-300`} />
            
            {/* Button Content */}
            <span className="relative z-10 text-gray-700 group-hover:text-white text-sm font-medium transition-colors duration-300">
              {t('categories.button')}
            </span>
            <svg 
              className="w-4 h-4 text-gray-700 group-hover:text-white transform group-hover/btn:translate-x-1 transition-all duration-300 relative z-10"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const CategorySection = () => {
  const { t } = useTranslation();

  const categories = [
    {
      icon: IoSunnyOutline,
      title: t('categories.items.weather.title'),
      description: t('categories.items.weather.description'),
      color: "from-blue-400 to-blue-600",
      lightColor: "from-blue-400/10 to-blue-600/10",
      categoryId: "weather"
    },
    {
      icon: FaPlane,
      title: t('categories.items.flights.title'),
      description: t('categories.items.flights.description'),
      color: "from-purple-400 to-purple-600",
      lightColor: "from-purple-400/10 to-purple-600/10",
      categoryId: "flights"
    },
    {
      icon: MdEventAvailable,
      title: t('categories.items.events.title'),
      description: t('categories.items.events.description'),
      color: "from-green-400 to-green-600",
      lightColor: "from-green-400/10 to-green-600/10",
      categoryId: "events"
    },
    {
      icon: FaCog,
      title: t('categories.items.customization.title'),
      description: t('categories.items.customization.description'),
      color: "from-orange-400 to-orange-600",
      lightColor: "from-orange-400/10 to-orange-600/10",
      categoryId: "customization"
    },
    {
      icon: MdExplore,
      title: t('categories.items.adventure.title'),
      description: t('categories.items.adventure.description'),
      color: "from-red-400 to-red-600",
      lightColor: "from-red-400/10 to-red-600/10",
      categoryId: "adventure"
    },
    {
      icon: MdMuseum,
      title: t('categories.items.cultural.title'),
      description: t('categories.items.cultural.description'),
      color: "from-indigo-400 to-indigo-600",
      lightColor: "from-indigo-400/10 to-indigo-600/10",
      categoryId: "cultural"
    }
  ];

  return (
    <section id="categories" className="relative bg-gray-50">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Content */}
      <div className="relative max-w-[1440px] mx-auto px-8 py-20">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">
              {t('categories.section.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('categories.section.description')}
            </p>
          </div>

          {/* Category Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <CategoryCard {...category} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
