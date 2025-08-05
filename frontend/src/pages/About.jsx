import { useNavigate } from 'react-router-dom';
import { FiShield, FiShoppingBag, FiUsers, FiCloud, FiLock, FiTruck, FiHeart, FiStar } from 'react-icons/fi';

const About = () => {
     const navigate = useNavigate();

  const features = [
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Secure Authentication",
      description: "Advanced JWT-based authentication system ensuring your data is always protected with industry-standard security protocols."
    },
    {
      icon: <FiShoppingBag className="w-8 h-8" />,
      title: "Smart Product Management",
      description: "Complete CRUD operations for products with intelligent categorization, real-time inventory tracking, and seamless browsing experience."
    },
    {
      icon: <FiTruck className="w-8 h-8" />,
      title: "Streamlined Orders",
      description: "Effortless order placement and management system that tracks your purchases from cart to delivery with real-time updates."
    },
    {
      icon: <FiCloud className="w-8 h-8" />,
      title: "Cloud-Powered Images",
      description: "Lightning-fast image uploads and delivery powered by Cloudinary, ensuring your products look stunning across all devices."
    }
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "500+", label: "Products" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  const techStack = [
    { name: "MongoDB", color: "bg-green-500" },
    { name: "Express.js", color: "bg-gray-700" },
    { name: "React.js", color: "bg-blue-500" },
    { name: "Node.js", color: "bg-green-600" },
    { name: "JWT Auth", color: "bg-purple-500" },
    { name: "Cloudinary", color: "bg-orange-500" }
  ];

  return (
    <div className="min-h-screen text-white bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden  text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              About Our Store
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              A modern, full-stack e-commerce platform built with cutting-edge MERN technology, 
              designed to deliver exceptional shopping experiences.
            </p>
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-lg">Trusted by thousands</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className=" font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl max-w-2xl mx-auto">
              Built with modern technology and user-centric design principles
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built with Modern Tech
            </h2>
            <p className="text-xl max-w-2xl mx-auto">
              Powered by the latest technologies for optimal performance and scalability
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <div key={index} className={`${tech.color} text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}>
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-xl leading-relaxed mb-6">
                To revolutionize online shopping by providing a secure, fast, and user-friendly 
                platform that connects customers with quality products seamlessly.
              </p>
              <div className="flex items-center space-x-4">
                <FiHeart className="w-8 h-8 text-red-400" />
                <span className="text-lg">Made with passion for great user experiences</span>
              </div>
            </div>
            
            <div className="bg-white text-black bg-opacity-10 backdrop-blur-lg rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Key Features</h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <FiLock className="w-5 h-5 text-green-400" />
                  <span>JWT-based secure authentication</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FiUsers className="w-5 h-5 text-green-400" />
                  <span>Protected user routes & profiles</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FiShoppingBag className="w-5 h-5 text-green-400" />
                  <span>Complete product management</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FiCloud className="w-5 h-5 text-green-400" />
                  <span>Cloud-based image handling</span>
                </li>
                <li className="flex items-center space-x-3">
                  <FiTruck className="w-5 h-5 text-green-400" />
                  <span>Seamless order processing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gray-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied customers and discover amazing products today
          </p>
          <button 
          onClick={() => navigate('/products')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
            Explore Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;