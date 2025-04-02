// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { FaFacebook, FaLinkedin, FaYoutube, FaInstagram } from 'react-icons/fa';


export default function Footer() {
  return (
    <footer className="border-t mt-16 px-6 py-6 text-sm text-gray-700">
      <div className="max-w-5xl mx-auto flex justify-between items-start flex-wrap gap-6">
        <div>
          <h2 className="font-medium mb-2">Split The Bill</h2>
          <div className="flex gap-3 text-gray-500 mt-2 text-lg">
            <FaFacebook />
            <FaLinkedin />
            <FaYoutube />
            <FaInstagram />
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Navigate</h3>
          <ul>
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
