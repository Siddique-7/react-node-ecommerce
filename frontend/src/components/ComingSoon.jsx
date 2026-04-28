import { Link } from "react-router-dom";
import { FiClock } from "react-icons/fi";

const ComingSoon = ({ pageName = "This page" }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center p-4">
      <FiClock className="text-6xl text-yellow-500 mb-4 animate-pulse" />
      <h1 className="text-3xl font-bold mb-2">{pageName} Coming Soon!</h1>
      <p className="text-gray-600 mb-4">
        We are working hard to get this page ready. Stay tuned!
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ComingSoon;