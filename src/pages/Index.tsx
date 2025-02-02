import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from "react";

const mockStockData = [
  { name: 'Jan', value: 4000, nasdaq: 15000, dow: 37500, volume: "1.2B" },
  { name: 'Feb', value: 3000, nasdaq: 15500, dow: 38000, volume: "1.5B" },
  { name: 'Mar', value: 5000, nasdaq: 15300, dow: 37800, volume: "1.3B" },
  { name: 'Apr', value: 2780, nasdaq: 16000, dow: 38500, volume: "1.4B" },
  { name: 'May', value: 1890, nasdaq: 16200, dow: 39000, volume: "1.6B" },
  { name: 'Jun', value: 2390, nasdaq: 16100, dow: 38800, volume: "1.8B" },
];

const featuredPost = {
  id: 1,
  title: "Global Markets Show Strong Recovery in Tech Sector",
  description: "Major indices surge as economic indicators point to sustained growth in technology sector. The S&P 500 technology sector led gains, rising 2.3% as semiconductor stocks rallied on AI optimism. Market analysts suggest this trend could continue as corporate earnings exceed expectations.",
  category: "Markets",
  image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f",
  date: "March 20, 2024",
  author: "Sarah Johnson"
};

const marketIndicators = [
  { name: "S&P 500", value: "5,050.25", change: "+0.75%", trend: "up", volume: "2.3B" },
  { name: "NASDAQ", value: "16,100.50", change: "+1.2%", trend: "up", volume: "3.1B" },
  { name: "DOW", value: "38,800.75", change: "-0.3%", trend: "down", volume: "1.8B" },
  { name: "Russell 2000", value: "2,123.45", change: "+0.5%", trend: "up", volume: "892M" },
  { name: "VIX", value: "15.32", change: "-2.1%", trend: "down", volume: "245M" }
];

const sectorPerformance = [
  { sector: "Technology", change: "+2.3%", volume: "4.2B" },
  { sector: "Healthcare", change: "+1.1%", volume: "2.8B" },
  { sector: "Finance", change: "-0.5%", volume: "3.1B" },
  { sector: "Energy", change: "+0.8%", volume: "1.9B" },
  { sector: "Consumer", change: "+0.3%", volume: "2.4B" }
];

const features = [
  {
    title: "Real-Time Market Data",
    description: "Stay updated with live market movements and instant price updates across global markets.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3"
  },
  {
    title: "Expert Analysis",
    description: "Get insights from financial experts and detailed market analysis to make informed decisions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
  },
  {
    title: "Comprehensive Coverage",
    description: "Access news and updates from all major financial markets worldwide.",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f"
  }
];

const mockNews = [
  {
    id: 1,
    title: "Federal Reserve Maintains Interest Rates",
    description: "The Federal Reserve kept interest rates steady at its latest meeting, signaling a cautious approach to monetary policy.",
    category: "Economy",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e",
  },
  {
    id: 2,
    title: "Tech Giants Report Strong Earnings",
    description: "Major technology companies exceeded market expectations in their latest quarterly earnings reports.",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0",
  },
  {
    id: 3,
    title: "Global Markets Rally on Economic Data",
    description: "Stock markets worldwide surge as new economic indicators suggest robust growth in major economies.",
    category: "Markets",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f",
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: featuredPost.title,
      text: featuredPost.description,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const user = JSON.parse(currentUser);
        setIsLoggedIn(user.isAuthenticated);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#348e37]/10 to-white">
      {isLoggedIn ? (
        <>
          {/* Featured Post Section */}
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-[400px] object-cover"
                />
                <div className="p-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="icon">
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={handleShare}>
                        <Share2 className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold mb-4 text-green-800">
                    {featuredPost.title}
                  </h1>
                  <p className="text-gray-600 mb-4">
                    {featuredPost.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{featuredPost.date}</span>
                    <span className="mx-2">•</span>
                    <span>{featuredPost.author}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Market Overview Section */}
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto max-w-6xl px-4">
              <h2 className="text-2xl font-bold mb-8 text-green-800">Market Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {marketIndicators.map((indicator, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">{indicator.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">{indicator.value}</span>
                      <span className={`text-sm font-semibold ${indicator.trend === 'up' ? 'text-success' : 'text-danger'}`}>
                        {indicator.change}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Volume: {indicator.volume}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Sector Performance */}
          <section className="py-12">
            <div className="container mx-auto max-w-6xl px-4">
              <h2 className="text-2xl font-bold mb-8 text-green-800">Sector Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sectorPerformance.map((sector, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">{sector.sector}</h3>
                    <div className="flex justify-between items-center">
                      <span className={`text-lg font-bold ${sector.change.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                        {sector.change}
                      </span>
                      <span className="text-sm text-gray-500">
                        Vol: {sector.volume}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Market Trends Chart */}
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto max-w-6xl px-4">
              <h2 className="text-2xl font-bold mb-8 text-green-800">Market Trends</h2>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockStockData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#348e37" name="S&P 500" />
                      <Line type="monotone" dataKey="nasdaq" stroke="#2a722c" name="NASDAQ" />
                      <Line type="monotone" dataKey="dow" stroke="#10B981" name="DOW" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Hero Section */}
          <section className="relative py-20 px-4 bg-gradient-to-r from-[#348e37] to-[#348e37]/80">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518495973542-4542c06a5843')] opacity-10 mix-blend-overlay"></div>
            <div className="container mx-auto max-w-6xl relative">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 text-white">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-down">
                    Your Source for Financial News
                  </h1>
                  <p className="text-xl opacity-90 animate-fade-up">
                    Get real-time market insights, comprehensive news coverage, and detailed market analysis - completely free.
                  </p>
                  <div className="space-x-4 pt-4">
                    <Button
                      size="lg"
                      onClick={() => navigate("/news")}
                      className="bg-white text-green-600 hover:bg-green-50 px-8 py-6 text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Browse Latest News
                    </Button>
                  </div>
                </div>
                <div className="h-[400px] bg-white/90 rounded-2xl shadow-lg p-6 animate-fade-up backdrop-blur-sm">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockStockData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#059669" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 -mt-10">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="grid md:grid-cols-3 gap-8 relative">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 bg-gradient-to-b from-green-50">
                      <h3 className="text-xl font-semibold mb-2 text-green-800">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Latest News Section with Horizontal Scroll */}
          <section className="py-20 bg-gradient-to-r from-[#348e37]/10 via-[#348e37]/5 to-[#348e37]/10">
            <div className="container mx-auto max-w-6xl px-4">
              <h2 className="text-3xl font-bold mb-12 text-green-800">
                Latest Financial News
              </h2>
              <div className="flex overflow-x-auto gap-8 pb-8 -mx-4 px-4">
                {mockNews.map((news) => (
                  <div
                    key={news.id}
                    className="min-w-[180px] md:min-w-[220px] bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex-shrink-0"
                  >
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={news.image} 
                        alt={news.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        {news.category}
                      </span>
                      <h3 className="text-xl font-semibold mt-4 mb-2 text-green-800">
                        {news.title}
                      </h3>
                      <p className="text-gray-600">{news.description}</p>
                      <Button
                        variant="ghost"
                        className="mt-4 text-green-600 hover:text-green-700 hover:bg-green-50 transition-all duration-300"
                      >
                        Read More →
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-20 relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')] bg-cover bg-center">
              <div className="absolute inset-0 bg-gradient-to-r from-[#348e37]/90 to-[#348e37]/90"></div>
            </div>
            <div className="container mx-auto max-w-4xl px-4 text-center relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Stay Informed with FinShorts
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join our community of readers who trust FinShorts for their daily financial news.
              </p>
              <Button
                size="lg"
                onClick={() => navigate("/news")}
                className="bg-white text-green-700 hover:bg-green-50 px-8 py-6 text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Read Latest News
              </Button>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Index;
