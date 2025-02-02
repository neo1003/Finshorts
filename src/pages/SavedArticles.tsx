import { Card } from "@/components/ui/card";
import { Clock, Share2, Star, ExternalLink, MoreVertical, Pencil, Trash2, Copy, Link } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SavedArticles = () => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState<any[]>([]);
  const [ratings, setRatings] = useState<{[key: number]: number}>({});
  const { toast } = useToast();

  // Get the bookmarked articles from localStorage
  useEffect(() => {
    const loadBookmarkedArticles = () => {
      const savedBookmarks = localStorage.getItem('bookmarkedArticles');
      if (savedBookmarks) {
        try {
          const parsedBookmarks = JSON.parse(savedBookmarks);
          // Ensure we're working with an array
          setBookmarkedArticles(Array.isArray(parsedBookmarks) ? parsedBookmarks : []);
        } catch (error) {
          console.error('Error parsing bookmarked articles:', error);
          setBookmarkedArticles([]);
        }
      }
    };

    loadBookmarkedArticles();
    // Add event listener to update bookmarks if they change in another tab
    window.addEventListener('storage', loadBookmarkedArticles);
    
    return () => {
      window.removeEventListener('storage', loadBookmarkedArticles);
    };
  }, []);

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
      toast({
        title: "Share",
        description: "Copy the URL from your browser's address bar to share this article",
      });
    }
  };

  const handleRating = (id: number, rating: number) => {
    setRatings(prev => ({...prev, [id]: rating}));
  };

  const handleRemoveArticle = (id: number) => {
    const updatedArticles = bookmarkedArticles.filter(article => article.id !== id);
    setBookmarkedArticles(updatedArticles);
    localStorage.setItem('bookmarkedArticles', JSON.stringify(updatedArticles));
    toast({
      title: "Article removed",
      description: "The article has been removed from your saved articles",
    });
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied",
      description: "Article link has been copied to clipboard",
    });
  };

  if (bookmarkedArticles.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">No Saved Articles</h2>
          <p className="text-gray-600">You haven't bookmarked any articles yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">Saved Articles</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookmarkedArticles.map((article) => (
          <Card 
            key={article.id} 
            className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in"
          >
            <div className="relative aspect-[16/9]">
              <img 
                src={article.image} 
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="bg-white hover:bg-white/90">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="w-48 bg-white border border-gray-200 shadow-lg"
                  >
                    <DropdownMenuItem 
                      onClick={() => handleCopyLink(article.url)}
                      className="hover:bg-gray-100"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy link
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => window.open(article.url, '_blank')}
                      className="hover:bg-gray-100"
                    >
                      <Link className="mr-2 h-4 w-4" />
                      Open in new tab
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuItem 
                      onClick={() => handleRemoveArticle(article.id)} 
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
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
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRating(article.id, star)}
                    className={`${
                      (ratings[article.id] || 0) >= star ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    <Star className="h-8 w-8" fill={(ratings[article.id] || 0) >= star ? "currentColor" : "none"} />
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <Button 
                  className="flex items-center gap-2"
                  onClick={() => handleShare(article.title, article.summary)}
                >
                  Share <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  Read More <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SavedArticles;