import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaArrowRight, FaTrophy, FaStar } from 'react-icons/fa';
import { IoEarth, IoClose } from 'react-icons/io5';
import { BiSupport } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VideoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-4xl mx-4 bg-black rounded-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group hover:bg-white/20 transition-all duration-300"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-white/10 group-hover:from-white/40 group-hover:to-white/20 transition-all duration-300" />
          <IoClose className="w-5 h-5 text-white relative z-10 group-hover:rotate-90 transition-transform duration-300" />
          <div className="absolute -inset-0.5 rounded-full border border-white/30 group-hover:border-white/50 group-hover:scale-105 transition-all duration-300" />
        </motion.button>
        <div className="relative pt-[56.25%]">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/your-video-id"
            title="Promotional Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Hero = () => {
  const { t } = useTranslation();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const scrollToFlights = () => {
    const element = document.querySelector('#flights');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.hasAttribute('data-scroll-target')) {
        const targetId = e.target.getAttribute('data-scroll-target');
        const element = document.querySelector(`#${targetId}`);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center pt-10 pb-20 overflow-hidden">
      {/* Warm Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[60%] h-[80%]">
          <div className="w-full h-full bg-gradient-to-bl from-orange-50 via-orange-100/50 to-transparent rounded-bl-[200px]" />
        </div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-orange-100/40 via-rose-100/40 to-purple-100/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [45, 0, 45],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tr from-amber-100/40 via-orange-100/40 to-rose-100/40 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Top Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-4"
          >
            <span className="bg-gradient-to-r from-orange-500/10 to-orange-500/20 text-orange-600 px-4 py-2 rounded-full text-sm font-medium border border-orange-200">
              {t('hero.badge.agency')}
            </span>

          </motion.div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-gray-900">{t('hero.heading.part1')}</span>
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-orange-600 via-rose-500 to-purple-600 text-transparent bg-clip-text">
                  {t('hero.heading.part2')}
                </span>
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 17C71.6667 3.66667 142.333 -2.66667 213 8C283.667 18.6667 354.333 9.33333 425 0"
                    stroke="url(#paint0_linear)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="paint0_linear" x1="1" y1="8.5" x2="425" y2="8.5" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F97316" />
                      <stop offset="0.5" stopColor="#F43F5E" />
                      <stop offset="1" stopColor="#9333EA" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              {t('hero.description')}
            </p>
          </div>

          {/* CTA Section */}
          <div className="flex flex-wrap items-center gap-6">
            <motion.button
              onClick={scrollToFlights}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-500 via-rose-500 to-purple-500 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              {t('hero.cta.start')} <FaArrowRight className="text-sm" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsVideoModalOpen(true)}
              className="group flex items-center gap-3"
            >
              <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                <FaPlay className="text-orange-500 w-3 h-3 ml-1" />
              </span>
              <span className="font-medium text-gray-700">{t('hero.cta.watch')}</span>
            </motion.button>
          </div>

          {/* Stats */}
          <div className="flex gap-12 pt-8 border-t border-orange-100">
            {[
              { number: t('hero.stats.travelers.number'), label: t('hero.stats.travelers.label'), icon: AiFillStar },
              { number: t('hero.stats.destinations.number'), label: t('hero.stats.destinations.label'), icon: IoEarth },
              { number: t('hero.stats.support.number'), label: t('hero.stats.support.label'), icon: BiSupport }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.2 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2">
                  <stat.icon className="text-2xl text-orange-500" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 text-transparent bg-clip-text">
                    {stat.number}
                  </span>
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column - Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative lg:ml-auto"
        >
          <div className="relative w-full max-w-[540px] mx-auto">
            {/* Main Image */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800&auto=format&fit=crop&q=60"
                alt="Travel Adventure"
                className="w-full h-[600px] object-cover object-center transform scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-transparent" />
            </div>
            
            {/* Floating Elements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -right-8 top-20 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <FaTrophy className="text-2xl text-orange-500" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">{t('hero.awards.title')}</div>
                  <div className="text-xs text-gray-500">{t('hero.awards.subtitle')}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute -left-8 bottom-20 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaStar className="text-2xl text-blue-500" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">{t('hero.rating.title')}</div>
                  <div className="text-xs text-gray-500">{t('hero.rating.subtitle')}</div>
                </div>
              </div>
            </motion.div>

            {/* Animated Decoration */}
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -z-10 inset-0 bg-gradient-to-r from-orange-200/20 via-rose-200/20 to-purple-200/20 rounded-[2.5rem] blur-xl"
            />
          </div>
        </motion.div>
      </div>
      {/* Video Modal */}
      <AnimatePresence>
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
        />
      </AnimatePresence>
    </section>
  );
};

export default Hero;
