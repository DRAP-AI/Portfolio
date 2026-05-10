import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold">DRAP AI</h3>
            <p className="text-gray-400">Creative Web Developers</p>
          </div>
          <div className="flex space-x-6">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaGithub size={24} />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaLinkedin size={24} />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaTwitter size={24} />
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} DRAP AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
