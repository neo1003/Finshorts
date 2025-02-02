import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white text-primary py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">FinShorts</h3>
            <p className="text-muted">
              Your trusted source for free financial news and market updates.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">News Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/market-analysis" className="text-muted hover:text-primary transition-colors duration-200">
                  Market Analysis
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-muted hover:text-primary transition-colors duration-200">
                  Latest News
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/education" className="text-muted hover:text-primary transition-colors duration-200">
                  News Guide
                </Link>
              </li>
              <li>
                <Link to="/market-analysis" className="text-muted hover:text-primary transition-colors duration-200">
                  Market Updates
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-muted hover:text-primary transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted hover:text-primary transition-colors duration-200">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-sm text-center text-muted">
            © {new Date().getFullYear()} FinShorts. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};