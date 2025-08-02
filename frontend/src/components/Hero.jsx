import { useState, useEffect } from 'react';
import { FiArrowRight, FiStar, FiTruck, FiShield, FiUsers } from 'react-icons/fi';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      title: "Summer Sale Spectacular",
      subtitle: "Up to 70% off on trending fashion & electronics",
      cta: "Shop Sale Now",
      accent: "Limited Time Only"
    },
    {
      title: "New Arrivals Just Dropped",
      subtitle: "Discover the latest trends and must-have items",
      cta: "Explore New",
      accent: "Fresh Collections"
    },
    {
      title: "Premium Quality Guaranteed",
      subtitle: "Curated products from trusted brands worldwide",
      cta: "Shop Premium",
      accent: "Quality Promise"
    }
  ];

  const stats = [
    { icon: FiUsers, value: "50K+", label: "Happy Customers" },
    { icon: FiStar, value: "4.9", label: "Average Rating" },
    { icon: FiTruck, value: "24h", label: "Fast & Free Delivery" },
    { icon: FiShield, value: "100%", label: "Secure Shopping" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentHero = heroSlides[currentSlide];

  
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white/20 rounded-full animate-bounce`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex items-center">
        <div className="w-full">
          {/* Main Hero Content */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">{currentHero.accent}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight animate-slide-up">
              {currentHero.title}
            </h1>
            
            <p className="text-xl md:text-3xl mb-10 text-gray-200 max-w-4xl mx-auto leading-relaxed animate-slide-up delay-200">
              {currentHero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up delay-300">
              <button className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 px-10 py-4 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <span>{currentHero.cta}</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="inline-flex items-center space-x-2 border-2 border-white/30 px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
                <span>View Categories</span>
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center space-x-2 mb-12">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white scale-125' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Trust Indicators & Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100 + 600}ms` }}
              >
                <div className="flex justify-center mb-3">
                  <stat.icon className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-1 text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
          opacity: 0;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </section>
  );
};

export default Hero;