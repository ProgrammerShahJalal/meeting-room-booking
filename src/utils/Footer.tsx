import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pb-10 pt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* MRBS Information */}
          <div className="mb-6 md:mb-0 md:w-1/2">
            <Link to="/" className="text-xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
                MRBS
              </span>
            </Link>
            <p className="mt-4 mr-12">
              Meeting Room Booking System is your go-to platform for reserving
              professional spaces in co-working environments. We are committed
              to offering a seamless and efficient booking experience, ensuring
              that your meetings are held in the perfect setting, every time.
            </p>
          </div>
          {/* Contact Information */}
          <div className="mb-6 md:mb-0 md:w-1/3">
            <h4 className="text-xl font-bold mb-4">Contact Information</h4>
            <p>123 Mechanical Keyboard St.</p>
            <p>Dhaka, Bangladesh.</p>
            <p>Email: shah.jalal.ju.bd@gmail.com</p>
            <p>Phone: (+880) 1303-856860</p>
          </div>

          {/* Quick Links */}
          <div className="mb-6 md:mb-0 md:w-1/3">
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul>
              <li className="mb-2">
                <Link to="/privacy-policy" className="hover:text-gray-400">
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/termsOfService" className="hover:text-gray-400">
                  Terms of Service
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about-us" className="hover:text-gray-400">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/meeting-rooms" className="hover:text-gray-400">
                  Meeting Rooms
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact-us" className="hover:text-gray-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="mb-6 md:mb-0 md:w-1/3">
            <h4 className="text-xl font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://web.facebook.com/shahjalal.programmer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com/mdshahjalal01"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://www.instagram.com/shahjalal.programmer/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/ProgrammerShahJalal/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <p>&copy; {new Date().getFullYear()} MRBS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
