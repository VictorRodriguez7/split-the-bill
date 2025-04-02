import { Link } from 'react-router-dom';
import logo from '../assets/SplitBillIcon.png';

export default function Header() {
  return (
    <header className="bg-white border-b shadow-sm py-4 px-6">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Split The Bill Logo" className="w-8 h-8" />
          <span className="text-lg font-semibold text-gray-800">Split The Bill</span>
        </Link>

        <nav>
          <Link to="/" className="text-black font-medium hover:underline">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
