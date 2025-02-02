import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, ChevronRight, Bookmark, Share2, Star, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const latestNews = [
  {
    id: 1,
    title: "Those who have created peace, are the world better?",
    category: "Society",
    source: "Financial Times",
    time: "July 25, 2023",
    summary: "Understanding the art of building meaningful connections and relationships in a world that often favors extroversion.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "This Concept Jet Could Get You From New York To London in Under 11 Minutes",
    category: "Technology",
    source: "Reuters",
    time: "July 20, 2023",
    summary: "Revolutionary aerospace technology promises to transform international travel with unprecedented speed and efficiency.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "The Shy Person's Guide to Winning Friends and Influencing People",
    category: "Society",
    source: "Bloomberg",
    time: "July 18, 2023",
    summary: "Local communities demonstrate extraordinary humanitarian efforts in times of crisis, earning international recognition.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Bradley Cooper's 'Maestro' Stirs Wellness At Sundance Film Festival Opening",
    category: "Entertainment",
    source: "The Guardian",
    time: "July 15, 2023",
    summary: "Innovative learning platforms offer diverse opportunities for personal and professional growth in the coming year.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Greek Islanders are to be Nominated for Peace Prize",
    category: "World",
    source: "TechCrunch",
    time: "July 14, 2023",
    summary: "Latest developments in artificial intelligence demonstrate unprecedented capabilities in complex problem-solving scenarios.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "35th Anniversary of the Space Shuttle Challenge Catastrophe, in pictures",
    category: "History",
    source: "National Geographic",
    time: "July 13, 2023",
    summary: "Innovative ocean cleanup initiative successfully removes thousands of tons of plastic waste from the Pacific Ocean.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "Uber is Using Phone Gyrometers to Check Whether Drivers go Over Speed",
    category: "Technology",
    source: "Health Journal",
    time: "July 12, 2023",
    summary: "Research confirms long-term health benefits of Mediterranean dietary patterns in large-scale study.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "10 Creative Courses That Will Keep You Learning New Things Next Year",
    category: "Education",
    source: "Space News",
    time: "July 11, 2023",
    summary: "Private space company reveals plans for first commercial space tourism mission scheduled for next year.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop"
  }
];

const News = () => {
  const [selectedNews, setSelectedNews] = useState(latestNews[0]);
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [ratings, setRatings] = useState<{[key: number]: number}>({});
  const { toast } = useToast();

  const toggleBookmark = (id: number) => {
    setBookmarked(prev => {
      const newBookmarks = prev.includes(id) 
        ? prev.filter(b => b !== id) 
        : [...prev, id];
      
      // Save bookmarked articles to localStorage
      const bookmarkedArticles = latestNews.filter(article => 
        newBookmarks.includes(article.id)
      );
      localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarkedArticles));
      
      return newBookmarks;
    });
  };

  const handleRating = (id: number, rating: number) => {
    setRatings(prev => ({...prev, [id]: rating}));
  };

  const handleShare = async (title: string, summary: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: summary,
          url: window.location.href
        });
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          toast({
            title: "Unable to share",
            description: "You can copy the URL from your browser's address bar",
            variant: "destructive"
          });
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      toast({
        title: "Share",
        description: "Copy the URL from your browser's address bar to share this article",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Side News Bar */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6 flex justify-between items-center">
                Latest News
                <span className="text-sm text-primary hover:text-primary/80 cursor-pointer">
                  More...
                </span>
              </h2>
              <ul className="space-y-4">
                {latestNews.map((news, index) => (
                  <li key={index} className="group">
                    <button 
                      onClick={() => setSelectedNews(news)}
                      className={`block w-full text-left text-sm leading-snug transition-colors duration-200 ${
                        selectedNews.id === news.id 
                          ? "text-primary font-medium" 
                          : "hover:text-primary"
                      }`}
                    >
                      {news.title}
                    </button>
                    {index < latestNews.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="mb-12">
            <article className="animate-fade-in">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-6">
                <img 
                  src={selectedNews.image} 
                  alt={selectedNews.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                    {selectedNews.category}
                  </span>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleBookmark(selectedNews.id)}
                      className={bookmarked.includes(selectedNews.id) ? "text-primary" : ""}
                    >
                      <Bookmark className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleShare(selectedNews.title, selectedNews.summary)}
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight">
                  {selectedNews.title}
                </h1>

                <div className="flex items-center text-sm text-gray-500 gap-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{selectedNews.time}</span>
                  </div>
                  <span>•</span>
                  <span>{selectedNews.source}</span>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {selectedNews.summary}
                </p>

                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRating(selectedNews.id, star)}
                      className={`${
                        (ratings[selectedNews.id] || 0) >= star ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      <Star className="h-8 w-8" fill={(ratings[selectedNews.id] || 0) >= star ? "currentColor" : "none"} />
                    </Button>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <Button className="flex items-center gap-2">
                    Read Full Article <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    Visit Source <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </article>
          </div>

          {/* News Grid */}
          <div className="mb-12">
            <ScrollArea className="h-[800px] w-full rounded-md">
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 pr-4">
                {latestNews.filter(news => news.id !== selectedNews.id).map((article) => (
                  <Card 
                    key={article.id} 
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in cursor-pointer"
                    onClick={() => setSelectedNews(article)}
                  >
                    <div className="relative aspect-[16/9]">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 space-y-4">
                      <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                        {article.category}
                      </span>
                      <h3 className="text-xl font-bold leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {article.summary}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{article.time}</span>
                        </div>
                        <span>•</span>
                        <span>{article.source}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
